import asyncHandler from 'express-async-handler';
import UserModel from '../app/models/User.js';

const checkRole = asyncHandler(async (req, res, next) => {
    const {email, role} = req.decodedToken;
    // console.log(email, role);
    const userLoging = await UserModel.findOne({email, role});
    if(!userLoging) {
        res.statusCode = 403;
        throw new Error('restricted access');
    }
    req.role = role;
    next();
})

export default checkRole;