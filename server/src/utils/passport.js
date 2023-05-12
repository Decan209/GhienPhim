import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../app/models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECET_KEY = process.env.SECET_KEY;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const passportGoogle = () => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/v1/auth/google/callback',
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/user.phonenumbers.read',
            'https://www.googleapis.com/auth/user.addresses.read',
            'https://www.googleapis.com/auth/profile.agerange.read']
    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await UserModel.findOne({ googleId: profile.id });
            const token = jwt.sign({ email: profile.emails[0].value, role: 'user' }, SECET_KEY, { expiresIn: '1d' });
            const refreshToken = jwt.sign({ email: profile.emails[0].value }, SECET_KEY, { expiresIn: '7d' });
            if (!user) {
                const newUser = new UserModel({
                    googleId: profile.id,
                    firstName: profile.name.givenName || '',
                    lastName: profile.name.familyName || ' ',
                    password: 'google',
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value,
                    refreshToken
                })
                await newUser.save();
                newUser.token = token
                cb(null, newUser);
            } else {
                user.refreshToken = refreshToken;
                await user.save();
                user.token = token;
                cb(null, user)
            }
    
        } catch (err) {
            return cb(err, null);
        }
    }))
}

export default passportGoogle;