import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    specialization: {
        type: String,
        enum: ['spa', 'barber','nails'],
        required: [true, 'provide a specialization']
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    availability: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },

})

const staffModel = mongoose.model('Staff', staffSchema);

export default staffModel;
