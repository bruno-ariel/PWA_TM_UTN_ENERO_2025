import pool from "../config/mysql.config.js";
import Channel from "../models/Channel.model.js";


class ChannelRepository {
    async createChannel(user_id, { name, workspace_id }) {
        const query = ` INSERT INTO channels (name, workspace, createdBy) VALUES (?, ?, ?)`
        const [result] = await pool.execute(query, [name, workspace_id, user_id])
        return {_id: result.insertId, name, workspace: workspace_id, createdBy: user_id}
    }
    async getAllChannelByWorkspaceId(workspace_id) {
        const query = `SELECT * FROM channels WHERE workspace = ?`
        const [channels] = await pool.execute(query, [workspace_id])
        return channels;
    }
    async getChannelById(channel_id) {
        const query = `SELECT * FROM channels WHERE _id = ?`
        const [channels] = await pool.execute(query, [channel_id])
        return channels;
    }
}

export default new ChannelRepository();
