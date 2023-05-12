import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    googleId: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: props => `${props.value} không phải là email hợp lệ!`
        }
    },
    picture: {
        type: String,
        default:''
    },
    mobile: {
        type: String,
        // default: '',
        // unique: true,
        // validate: {
        //     validator: (value) => {
        //         if(value === '') return true;
        //         return /^\d{10}$/.test(value);
        //     },
        //     message: props => `${props.value} không phải số điện thoại hợp lệ!`
        // }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    refreshToken: {
        type: String,
    },
    passwordChangedAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    favouriteMovie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'YoutubeMovie'
    }]
})

export default mongoose.model('User', User);