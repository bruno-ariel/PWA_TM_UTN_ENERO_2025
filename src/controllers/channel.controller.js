import Channel from "../models/Channel.model.js"
import Message from "../models/Message.model.js"
import Workspace from "../models/workspace.model.js"
import ChannelRepository from "../repository/channel.repository.js"
import MessageRepository from "../repository/message.repository.js"

export const createChannelController = async (req, res) => {
    try{
        const {id} = req.user
        const {workspace_id} = req.params
        const {name} = req.body
        
        const channel_created = await ChannelRepository.createChannel(id, {name, workspace_id})

        const channels = await ChannelRepository.getAllChannelByWorkspaceId(workspace_id)
        return res.json({
            ok: true,
            message: "Channel created succesfully",
            status: 201,
            data: {
                new_channel: channel_created,
                channels
            }
        })
    }
    catch(error){   
        console.error(error)
        return res.json({
            ok: false, 
            status: 500, 
            message: "Internal server error"
        })
    }
}

export const getChannelsListController = async (req, res) => {
    try{
        const {id} = req.user
        const {workspace_id} = req.params
        const {workspace_selected} = req

        const channels = await ChannelRepository.getAllChannelByWorkspaceId(workspace_id)
        return res.json({
            ok: true,
            message: "Channels list",
            status: 200,
            data: {
                channels
            }
        })
    }
    catch(error){   
        console.error(error)
        return res.json({
            ok: false, 
            status: 500, 
            message: "Internal server error"
        })
    }
}

export const sendMessageController = async (req, res) => {
    try{
        const {channel_id, workspace_id} = req.params
        const {content} = req.body
        const {id} = req.user
        const channel_selected = await ChannelRepository.getChannelById(channel_id)
        if(!channel_selected){
            return res.json({
                ok: false, 
                status: 404, 
                message: "Channel not found"})
        }
        const new_message = await MessageRepository.createMessage({
            sender_user_id: id, 
            content, 
            channel_id
        })
        return res.json({
            ok: true,
            message: "Message created",
            status: 201,
            data: {
                new_message
            }
        })
    }
    catch (error){
        return res.json({
            ok: false, 
            status: 500, 
            message: "Internal server error messages"
        })
    }
}

export const getMessageFromChannelController = async (req, res) => {
    try{
        const {channel_id, workspace_id} = req.params
        const channel_selected = await ChannelRepository.getChannelById(channel_id)
        if(!channel_selected){
            return res.json({
                ok: false, 
                status: 404, 
                message: "Channel not found"})
        }
        const messages = await MessageRepository.getAllMessagesFromByChannel(channel_id)
        return res.json({
            ok: true,
            message: "Messages list",
            status: 200,
            data: {
                messages
            }
        })
    }
    catch (error){
        return res.json({
            ok: false, 
            status: 500, 
            message: "Internal server error"
        })
    }
}