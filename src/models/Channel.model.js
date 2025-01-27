import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Workspace',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
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

const Channel = mongoose.model('Channel', channelSchema)

export default Channel

/* 
name
workspace => referencia a la coleccion de workspaces
createdBy
createdAt
modifiedAt
*/
