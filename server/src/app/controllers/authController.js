import asyncHandler from 'express-async-handler';
import UserModel from '../models/User.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { SECET_KEY } from '../../index.js';
dotenv.config();
const DOMAIN = process.env.DOMAIN;
const salt = 10;




const loginGoogle = asyncHandler(async (req, res) => {
    res.cookie('refreshToken', req.user.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 1000
    })
    const user = req.user;
    console.log(user);
    const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
        token: user.token
    }
    res.json({
        status: 'ok',
        message: 'login successfully',
        data
    })
})

const getAllUser = asyncHandler(async (req, res) => {
    if (req.role !== 'admin') {
        res.statusCode = 403;
        throw new Error('Forbidden');
    }
    const data = await UserModel.find({})
    res.status(200).json({
        status: 'ok',
        message: 'get all users successfully',
        data
    });
})

const blockUser = asyncHandler(async (req, res) => {
    const { email } = req.params;
    if (req.role !== 'admin') {
        res.statusCode = 401;
        throw new Error('Unauthorized');
    }
    const deletedUser = await UserModel.findOneAndDelete({ email });
    if (!deletedUser) {
        res.statusCode = 404;
        throw new Error('Cannot find user to delete!')
    }
    console.log(deletedUser);
    res.status(200).json({
        status: 'ok',
        message: 'delete user successfully!',
        data: {
            ...deletedUser,
            password: ''
        }
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email && password && Object.keys(req.body).length === 2) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.statusCode = 404;
            throw new Error('no user exists with email: ' + email);
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.statusCode = 401;
            throw new Error('Incorrect password');
        }
        const token = jwt.sign({
            email,
            role: user.role
        }, SECET_KEY, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ email }, SECET_KEY, { expiresIn: '7d' });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 1000
        })
        res.cookie("token",token,{
            httpOnly: true,
            maxAge : 24*60*60*1000
        })
        res.status(200).json({
            status: "ok",
            message: "login successfully",
            email,
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                picture: user.picture,
                email,
                token
            }
        })
    } else throw new Error('Please fill in the correct information')
    })
    
const register = asyncHandler(async (req, res) => {
    if(!req.body){
        throw new Error("Body not found!");
    }
    const { firstName, lastName, email, mobile, password } = req.body;
    if (firstName && lastName && email && mobile && password && Object.keys(req.body).length === 5) {
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new UserModel({
            ...req.body,
            password: hashPassword
        });
        try{
            await newUser.save();
            res.status(201).json({
                status: "ok",
                message: "register successfully!",
                data: { firstName, lastName, email }
            })
        } catch(err) {
            if(err.name === 'MongoServerError' && err.code === 11000 && err.keyValue.email){
                res.statusCode = 409;
                throw new Error("Email đã tồn tại");
            } 
            if(err.name === 'MongoServerError' && err.code === 11000 && err.keyValue.mobile) {
                res.statusCode = 409;
                throw new Error("Mobile đã tồn tại");
            }
        }
    } else throw new Error("Please fill in the correct information");
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        res.statusCode = 404;
        throw new Error('User not found!');
    };
    const passwordResetToken = jwt.sign({ email }, SECET_KEY, { expiresIn: '30m' });
    user.passwordResetToken = passwordResetToken;
    user.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tutuananh975@gmail.com',
            pass: 'kjxhcmutxszaeblb'
        }
    });

    const resetURL = `${DOMAIN}/reset-password/${passwordResetToken}`;
    console.log(resetURL);

    const mailOptions = {
        from: 'tutuananh975@gmail.com',
        to: email,
        subject: 'Forgot Password',
        text: 'Vui lòng click vào đường link dưới đây để thay đổi mật khẩu',
        html: `
            <a href=${resetURL}>${resetURL}</a>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({
        status: "ok",
        message: "send password reset token to email successfully!",
        data: info
    })
})

const changePassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const { email } = req.decodedToken;
    const passwordResetToken = req.headers['authorization'].split(' ')[1];
    const user = await UserModel.findOne({ email, passwordResetToken });
    if (!user) {
        res.statusCode = 401;
        throw new Error('Unauthorized');
    }
    const comparePassword = await bcrypt.compare(newPassword, user.password);
    if (comparePassword) {
        res.statusCode = 400;
        throw new Error('The new password cannot be the same as the old password');
    }
    const newHashPassword = bcrypt.hashSync(newPassword, salt);
    user.password = newHashPassword;
    user.passwordResetToken = "";
    user.passwordChangedAt = new Date();
    user.save();
    res.status(200).json({
        status: 'ok',
        message: "Change password successfully!",
        data: ""
    })
})

const refreshToken = asyncHandler(async (req, res) => {
    const { email } = req.decodedToken;
    const refreshToken = req.cookies.refreshToken;
    const user = await UserModel.findOne({ email, refreshToken });
    if (!user) {
        res.statusCode = 404;
        throw new Error('User not found');
    }
    const newToken = jwt.sign({ email, role: user.role }, SECET_KEY, { expiresIn: '1d' });
    const newRefreshToken = jwt.sign({ email }, SECET_KEY, { expiresIn: '7d' });
    user.refreshToken = newRefreshToken;
    await user.save();
    res.clearCookie('refreshToken');
    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: 24 * 7 * 60 * 1000
    })
    res.status(200).json({
        status: 'ok',
        message: 'refresh token successfully!',
        data: {
            token: newToken
        }
    })
})

export {
    getAllUser,
    blockUser,
    login,
    register,
    forgotPassword,
    changePassword,
    refreshToken,
    loginGoogle
}