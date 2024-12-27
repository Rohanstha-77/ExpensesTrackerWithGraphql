import exp from "constants";
import mongoose from "mongoose";
import { type } from "os";

const transactionSchema = mongoose.model({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    paymentType:{
        type: String,
        required: true,
        enum: ["cash","card"]
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        enum: ["saving","expenses","invesment"]
    },
    location:{
        type: String,
        default: "unknown"
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required:true
    }
})

const transaction = mongoose.model("Transaction",transactionSchema)

export default transaction