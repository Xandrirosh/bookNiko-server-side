import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'provide a name']
    },
    email: {
        type: String,
        required: [true, 'Provide an email'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Provide a password'],
        select: false  // prevents password from being returned by default
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: ''
    },
    mobile: {
        type: String,
        default: '',
        match: [/^\+?[0-9]{7,15}$/, 'Invalid mobile number']
    },
    refresh_token: {
        type: String,
        default: ''
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: null
    },
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true
    }
)

const userModel = mongoose.model('User', userSchema);

export default userModel;
