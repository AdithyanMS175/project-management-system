import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

//user register api
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/register`, reqBody);
};

//user login api
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/login`, reqBody);
};

export const createProjectAPI = async (reqbody, reqHeader) => {
    return await commonAPI("POST",`${serverURL}/createprojects`,reqbody,reqHeader);
};

export const getProjectsAPI = async (page, reqHeader) => {
    return await commonAPI("GET",`${serverURL}/projects?page=${page}`,{},reqHeader);
};

// admin: delete user
export const deleteProjectAPI = async (projectId, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/projects/${projectId}`, {}, reqHeader);
};


// admin: fetch all users
export const getUsersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/users`, {}, reqHeader);
};

// admin: delete user
export const deleteUserAPI = async (userId, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/users/${userId}`, {}, reqHeader);
};

export const getTasksAPI = async (projectId, reqHeader) => {
    return await commonAPI("GET",`${serverURL}/tasks/${projectId}`,{},reqHeader);
};

export const addTaskAPI = async (projectId, body, reqHeader) => {
    return await commonAPI("POST",`${serverURL}/tasks/${projectId}`,body,reqHeader);
};

export const deleteTaskAPI = async (taskId, token) => {
    return await commonAPI(
        "DELETE",
        `${serverURL}/tasks/${taskId}`,
        "",
        { Authorization: `Bearer ${token}` }
    );
};

export const toggleTaskAPI = async (taskId, token) => {
    return await commonAPI(
        "PATCH",
        `${serverURL}/tasks/toggle/${taskId}`,
        "",
        { Authorization: `Bearer ${token}` }
    );
};
