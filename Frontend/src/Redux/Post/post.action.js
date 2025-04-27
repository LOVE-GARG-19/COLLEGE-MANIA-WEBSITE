import { api } from "../../config/api"
import { CREATE_POST_FAILUER,UNLIKE_POST_SUCCESS,UNSAVE_POST_SUCCESS, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILUER, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILUER, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILUER, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SAVE_POST_FAILUER, SAVE_POST_REQUEST, SAVE_POST_SUCCESS } from "./post.actionType"

export const createPost=(postData)=>async (dispatch)=>{
    dispatch({type:CREATE_POST_REQUEST})
    try {
       console.log("post Data before created ",postData);
        const {data} = await api.post("/api/posts/create",postData)

        dispatch({type:CREATE_POST_SUCCESS,payload:data})

        
    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:CREATE_POST_FAILUER,payload:error})
    }
}

export const getAllPost=()=>async (dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST})
    try {

        const {data} = await api.get("/api/posts/all")
        console.log("all posts data ",data)
        dispatch({type:GET_ALL_POST_SUCCESS,payload:data})

        
    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:GET_ALL_POST_FAILUER,payload:error})
    }
}

export const getUsersPost=(userId)=>async (dispatch)=>{
    const token = localStorage.getItem("jwt");
    dispatch({type:GET_USERS_POST_REQUEST})
    try {

        const {data} = await api.get(`/api/posts/user/${userId}`,null,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

        dispatch({type:GET_USERS_POST_SUCCESS,payload:data})

        
    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:GET_USERS_POST_FAILUER,payload:error})
    }
}

export const likePost=(postId)=>async (dispatch)=>{
    const token = localStorage.getItem("jwt");
    dispatch({type:LIKE_POST_REQUEST})
    try {

        const {data} = await api.put(`/api/posts/like/${postId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        dispatch({type:LIKE_POST_SUCCESS,payload:data})

    } catch (error) {

        console.log("catch error ",error)
        dispatch({type:LIKE_POST_FAILUER,payload:error})
    }
}
export const unlikePost=(postId)=>async (dispatch)=>{
    const token = localStorage.getItem("jwt");
    dispatch({type:LIKE_POST_REQUEST})
    try {

        const {data} = await api.put(`/api/posts/unlike/${postId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        dispatch({type:UNLIKE_POST_SUCCESS,payload:data})

    } catch (error) {

        console.log("catch error ",error)
        dispatch({type:LIKE_POST_FAILUER,payload:error})
    }
}

export const savePost=(postId)=>async (dispatch)=>{
    dispatch({type:SAVE_POST_REQUEST})
    try {

        const {data} = await api.put(`/api/posts/save_post/${postId}`)
        console.log("posts data after save",data);
        dispatch({type:SAVE_POST_SUCCESS,payload:data})
        
    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:SAVE_POST_FAILUER,payload:error})
    }
}
export const unsavePost=(postId)=>async (dispatch)=>{
    dispatch({type:SAVE_POST_REQUEST})
    try {

        const {data} = await api.put(`/api/posts/unsave_post/${postId}`)
        console.log("posts data after unsave",data);
        dispatch({type:UNSAVE_POST_SUCCESS,payload:data})
        
    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:SAVE_POST_FAILUER,payload:error})
    }
}