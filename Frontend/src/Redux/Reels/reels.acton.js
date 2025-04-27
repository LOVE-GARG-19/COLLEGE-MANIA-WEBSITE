import { api } from "../../config/api"
import { CREATE_REELS_FAILUER, CREATE_REELS_REQUEST, CREATE_REELS_SUCCESS, GET_ALL_REELS_FAILUER, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS, GET_USERS_REEL_FAILUER, GET_USERS_REEL_REQUEST, GET_USERS_REEL_SUCCESS } from "./reels.actionType"

export const createReels=(reelData)=>async (dispatch)=>{
    dispatch({type:CREATE_REELS_REQUEST})
    try {
       const token = localStorage.getItem("jwt");
        const {data} = await api.post("/api/reels/create",reelData,{
            headers: {
                Authorization: `Bearer ${token}`,  // Include token in the request header
              },
        })

        dispatch({type:CREATE_REELS_SUCCESS,payload:data})

        console.log("created reels",data)

        
    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:CREATE_REELS_FAILUER,payload:error})
    }
}

export const getAllReels=()=>async (dispatch)=>{
    dispatch({type:GET_ALL_REELS_REQUEST})
    try {

        const {data} = await api.get("/api/reels/")
        console.log("reels fetched------------------------",data);
        dispatch({type:GET_ALL_REELS_SUCCESS,payload:data})

    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:GET_ALL_REELS_FAILUER,payload:error})
    }
}

export const getUsersReels=(userId)=>async (dispatch)=>{
    dispatch({type:GET_USERS_REEL_REQUEST})
    try {

        const {data} = await api.get(`/api/reels/user/${userId}`)

        dispatch({type:GET_USERS_REEL_SUCCESS,payload:data})

    } catch (error) {
        console.log("catch error ",error)
        dispatch({type:GET_USERS_REEL_FAILUER,payload:error})
    }
}
