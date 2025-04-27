// reducer.js
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

const initialState = {
  comments: [],
  create: false,
  likingComment: false,
  unlikingComment: false,    // New state for unliking
  deletingComment: false,
  error: null,
  loading: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Comment
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        create: false,
        error: null,
        loading: true,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        create: true,
        comments: [...state.comments, action.payload],
        create:action.payload,
        error: null,
        loading: false,
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        create: false,
        error: action.payload,
        loading: false,
      };

    // Like Comment
    case LIKE_COMMENT_REQUEST:
      return {
        ...state,
        likingComment: true,
        error: null,
      };
    case LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        likingComment: false,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id
            ? { ...comment, likes: action.payload.likes }
            : comment
        ),
        error: null,
      };
    case LIKE_COMMENT_FAILURE:
      return {
        ...state,
        likingComment: false,
        error: action.payload,
      };

    // Unlike Comment (new)
    case UNLIKE_COMMENT_REQUEST:
      return {
        ...state,
        unlikingComment: true,
        error: null,
      };
    case UNLIKE_COMMENT_SUCCESS:
      return {
        ...state,
        unlikingComment: false,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id
            ? { ...comment, likes: action.payload.likes }
            : comment
        ),
        error: null,
      };
    case UNLIKE_COMMENT_FAILURE:
      return {
        ...state,
        unlikingComment: false,
        error: action.payload,
      };

    // Delete Comment
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        deletingComment: true,
        error: null,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deletingComment: false,
        comments: state.comments.filter((comment) => comment.id !== action.payload.id),
        error: null,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deletingComment: false,
        error: action.payload,
      };
      case FETCH_COMMENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_COMMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: action.payload,
          error: null,
        };
      case FETCH_COMMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  

    default:
      return state;
  }
};

export default commentReducer;
