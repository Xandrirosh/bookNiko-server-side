import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'provide a user']
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'provide a service']
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: [true, 'provide a staff member']
    },
    date: {
        type: Date,
        required: [true, 'provide a date']
    },
    time: {
        type: String,
        required: [true, 'provide a time']
    }
},
    {
        timestamps: true
    }
);

const bookingModel = mongoose.model('Booking', bookingSchema);

export default bookingModel;
