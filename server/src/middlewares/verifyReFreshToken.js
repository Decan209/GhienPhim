import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { SECET_KEY } from '../index.js';

const verifyReFreshToken = asyncHandler(async (req, res, next) => {
    // const token = req.cookies.refreshToken;
    // if(!token) {
    //     res.statusCode = 401;
    //     throw new Error('Unauthorized');
    // }

    // try {
    //     const decoded = jwt.verify(token, SECET_KEY);
    //     req.decodedToken = decoded;
    //     next();
    // } catch(err) {
    //     if(err.name === 'TokenExpiredError') {
    //         res.statusCode = 401;
    //         throw new Error('Token expired');
    //     } else {
    //         res.statusCode = 403;
    //         throw new Error('Forbidden');
    //     }
    // }
    next()
})

export default verifyReFreshToken;