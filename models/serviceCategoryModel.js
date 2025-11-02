import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
     name:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
},{
    timestamps: true
})

const categoryModel = mongoose.model('serviceCategory', categorySchema)

export default categoryModel