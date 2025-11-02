import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'provide a name']
    },
    description: {
        type: String,
        required: [true, 'provide a description']
    },
    image: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        required: [true, 'provide a price']
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'serviceCategory'
        }
    ],
    duration: {
        type: String,
        required: [true, 'provide a duration']
    },
},
    {
        timestamps: true
    }
);

//create a text index
serviceSchema.index({
    name: 'text',
    description: 'text'
}, {
    weights: { name: 10, description: 5 }
})

const serviceModel = mongoose.model('Service', serviceSchema);

export default serviceModel;
