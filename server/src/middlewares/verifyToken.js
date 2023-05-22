import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { SECET_KEY } from '../index.js';

const verifyToken = asyncHandler(async (req, res, next) => {
    // const token = req.headers['authorization'].split(' ')[1];
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

export default verifyToken;