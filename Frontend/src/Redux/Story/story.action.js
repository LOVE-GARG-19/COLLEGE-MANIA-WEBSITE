import { 
    FETCH_USER_STORIES_REQUEST,
    FETCH_USER_STORIES_SUCCESS,
    FETCH_USER_STORIES_FAILURE,
    CREATE_STORY_REQUEST,
    CREATE_STORY_SUCCESS,
    CREATE_STORY_FAILURE,
    FETCH_FOLLOWED_USER_STORIES_REQUEST, 
    FETCH_FOLLOWED_USER_STORIES_SUCCESS, 
    FETCH_FOLLOWED_USER_STORIES_FAILURE,
  } from './story.actionType';
  import { api } from '../../config/api';
  
  export const fetchUserStories = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_USER_STORIES_REQUEST });
  
    try {
      const response = await api.get(`/api/stories/${userId}`);
      dispatch({ type: FETCH_USER_STORIES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USER_STORIES_FAILURE, payload: error.message });
    }
  };
  
  export const createStory = (storyData) => async (dispatch) => {
    dispatch({ type: CREATE_STORY_REQUEST });
    const token = localStorage.getItem("jwt");  // Get JWT token from localStorage
    try {
      const response = await api.post("/api/stories/create", storyData,{
        headers: {
            Authorization: `Bearer ${token}`,  // Include token in the request header
          },
      });
      dispatch({ type: CREATE_STORY_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_STORY_FAILURE, payload: error.message });
    }
  };

  // Action to fetch followed user stories
  export const fetchFollowedUserStories = () => async (dispatch) => {
    dispatch({ type: FETCH_FOLLOWED_USER_STORIES_REQUEST });
  
    const token = localStorage.getItem("jwt");  // Get JWT token from localStorage
  
    try {
      const response = await api.get('/api/stories/follow_user_stories', {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in the request header
        },
      });
  
      dispatch({ 
        type: FETCH_FOLLOWED_USER_STORIES_SUCCESS, 
        payload: response.data 
      });  // Dispatch success with stories data
    } catch (error) {
      dispatch({ 
        type: FETCH_FOLLOWED_USER_STORIES_FAILURE, 
        payload: error.message 
      });  // Dispatch failure with error message
    }
  };