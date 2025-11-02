import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: [true, 'provide a booking']
    },
    amount: {
        type: Number,
        required: [true, 'provide an amount']
    },
    method: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: [true, 'provide a payment method']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
},
    {
        timestamps: true
    }
);

const paymentModel = mongoose.model('Payment', paymentSchema);

export default paymentModel;
