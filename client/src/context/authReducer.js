export const initialState = {
  user: null,
  isAuthenticated: false,
  isSubmitting: false,
  accessToken: null,
  errorMsg: null,
};

/**
 *
 * @param {Object} state - the current auth state
 * @param {Object} action -The action object containing the type and payload.
 * @returns - the updated state object based on the action type
 * provided
 */

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    case "UPDATE_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    case "SET_IS_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};
