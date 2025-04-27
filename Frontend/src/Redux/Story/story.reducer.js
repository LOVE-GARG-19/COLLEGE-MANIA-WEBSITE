import {
    FETCH_FOLLOWED_USER_STORIES_REQUEST,
    FETCH_FOLLOWED_USER_STORIES_SUCCESS,
    FETCH_FOLLOWED_USER_STORIES_FAILURE,
    FETCH_USER_STORIES_REQUEST,
    FETCH_USER_STORIES_SUCCESS,
    FETCH_USER_STORIES_FAILURE,
    CREATE_STORY_REQUEST,
    CREATE_STORY_SUCCESS,
    CREATE_STORY_FAILURE,
  } from './story.actionType';  // Import action types
  
  const initialState = {
    stories: [],  // To hold the list of stories for the current user
    followedUserStories: [],  // To hold the list of stories from followed users
    loading: false,  // Loading state for async actions
    error: null,  // To hold any error messages
  };
  
  const storyReducer = (state = initialState, action) => {
    switch (action.type) {
      // Handle loading states
      case FETCH_FOLLOWED_USER_STORIES_REQUEST:
      case FETCH_USER_STORIES_REQUEST:
      case CREATE_STORY_REQUEST:
        return { ...state, loading: true };
  
      // Handle success states
      case FETCH_FOLLOWED_USER_STORIES_SUCCESS:
        return { ...state, loading: false, followedUserStories: action.payload };
  
      case FETCH_USER_STORIES_SUCCESS:
        return { ...state, loading: false, stories: action.payload };
  
      case CREATE_STORY_SUCCESS:
        return { ...state, loading: false, stories: [action.payload, ...state.stories] };
  
      // Handle failure states
      case FETCH_FOLLOWED_USER_STORIES_FAILURE:
      case FETCH_USER_STORIES_FAILURE:
      case CREATE_STORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default storyReducer;
  