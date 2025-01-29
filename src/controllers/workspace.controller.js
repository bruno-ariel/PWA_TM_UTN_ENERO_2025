import User from "../models/User.model.js";
import { ServerError } from "../utils/errors.utils.js";
import UserRepository from "../repository/user.repository.js";
import WorkspaceRepository from "../repository/workspaces.repository.js";

export const createWorkspaceController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.user;
        const new_workspace = await WorkspaceRepository.createWorkspace({
            name,
            id
        })
        res.json({
            ok: true,
            message: "Workspace created",
            status: 201,
            data: {
                new_workspace,
            },
        })
    } catch (error) {
        console.error(error);
        return res.json({
            ok: false,
            status: 500,
            message: "Internal server error",
        })
    }
}

export const inviteUserToWorkspaceController = async (req, res) => {
    try {
        const { id } = req.user;
        const { workspace_id } = req.params;
        const { email } = req.body;

        const user_invited = await UserRepository.findUserByEmail(email);
        if (!user_invited) {
            throw new ServerError("User not found", 404);
        }
        const workspace_modified = await WorkspaceRepository.addMemberToWorkspace(workspace_id, user_invited._id)
        return res.json({
            ok: true,
            status: 201,
            message: "User invited to workspace",
            data: {
                workspace_selected: workspace_modified,
            },
        })
    }
    catch (error){
        console.error(error)
        if (error.status){
            return res.json(
                {
                    ok: false,
                    message: error.message,
                    status: error.status,
                }
            )
        }
        return res.json({
            ok: false,
            status: 500,
            message: "Internal server error",
        })
    }
}

export const getWorkspacesController = async (req, res) => {
    try {
        console.log(req.user)
        const { id } = req.user

        const workspaces = await WorkspaceRepository.getWorkspaceByMemberId(id)
            
        return res.json({
            ok: true,
            status: 200,
            message: "Workspaces list",
            data: {
                workspaces
            }
        })
    }
    catch (error) {
        console.error(error);
        return res.json({
            ok: false,
            status: 500,
            message: "Internal server error",
        })
    }
}
