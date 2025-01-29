import Workspace from "../models/Workspace.model.js"
import workspacesRepository from "../repository/workspaces.repository.js"


const isWorkspaceMemberMiddleware = async (req, res, next) => {
    try{
        const {id} = req.user
        const {workspace_id} = req.params
        const workspace_selected = await workspacesRepository.findWorkspaceById(workspace_id)
        if(!workspace_selected){
            return res.json({
                ok: false,
                status: 404,
                message: "Workspace not found"
            })
        }
        if(!workspacesRepository.isUserMemberOfWorkspace(id, workspace_id)){
            return res.json({
                ok: false,
                status: 403,
                message: "You are not a member of this workspace"
            })
        }
        req.workspace_selected = workspace_selected
        return next()
    }
    catch (error) {
        console.error(error)
        return res.json({
            ok: false, 
            status: 500, 
            message: "Internal server error"
        })
    }
}

export default isWorkspaceMemberMiddleware