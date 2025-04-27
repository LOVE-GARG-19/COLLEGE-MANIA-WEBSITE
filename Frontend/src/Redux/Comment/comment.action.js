// actions.js
import axios from 'axios';
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  UNLIKE_COMMENT_REQUEST,    // New action type for unlike
  UNLIKE_COMMENT_SUCCESS,    // New action type for unlike success
  UNLIKE_COMMENT_FAILURE,    // New action type for unlike failure
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
} from './comment.actionType';
import { api } from '../../config/api';

// Action to create a comment
const createCommentRequest = () => ({
  type: CREATE_COMMENT_REQUEST,
});

const createCommentFailure = (error) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error,
});

export const createComment = (reqData) => async (dispatch) => {
  dispatch(createCommentRequest());
  console.log("Comment Data before created: ", reqData);
  try {
    const response = await api.post(`/api/comments/create/${reqData.postId}`, reqData.data);
    console.log("Created comment: ", response.data);
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch(createCommentFailure(error));
  }
};

// Action to like a comment
export const likeComment = (commentId) => async (dispatch) => {
  dispatch({ type: LIKE_COMMENT_REQUEST });

  // Get JWT token from localStorage
  const token = localStorage.getItem('jwt');  // JWT token stored in localStorage

  try {
    const response = await api.put(
      `/api/comments/like/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token to Authorization header
        },
      }
    );
    console.log("like comment response",response.data)
    dispatch({ type: LIKE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LIKE_COMMENT_FAILURE, payload: error });
  }
};

// Action to unlike a comment (new)
export const unlikeComment = (commentId) => async (dispatch) => {
  dispatch({ type: UNLIKE_COMMENT_REQUEST });

  // Get JWT token from localStorage
  const token = localStorage.getItem('jwt');  // JWT token stored in localStorage

  try {
    const response = await api.put(
      `/api/comments/unlike/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token to Authorization header
        },
      }
    );
    console.log("unlike comment response",response.data)
    dispatch({ type: UNLIKE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UNLIKE_COMMENT_FAILURE, payload: error });
  }
};

// Action to delete a comment
export const deleteComment = (commentId) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT_REQUEST });
  
  try {
    const response = await api.delete(`/api/comments/delete/${commentId}`);
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DELETE_COMMENT_FAILURE, payload: error });
  }
};

// FETCH COMMENTS BY POST ID
export const fetchCommentsByPostId = (postId) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });

  try {
    const response = await api.get(`/api/comments/post/${postId}`);
    console.log("Fetched Comments: ", response.data);
    dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_COMMENTS_FAILURE, payload: error });
  }
};

