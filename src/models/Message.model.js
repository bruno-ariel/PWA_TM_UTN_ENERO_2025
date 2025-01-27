/* 
channel (hace ref a?)
sender (hace ref a?)
content
createdAt
modifiedAt
*/

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema ({
    channel : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model('Message', messageSchema)

export default Message