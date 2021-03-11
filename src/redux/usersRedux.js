import Axios from 'axios';

/* selectors */
export const getAllUsers = ({ users }) => users.data;

/* action name creator */
const reducerName = 'users';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const LOAD_USERS = createActionName('LOAD_USERS');
const ADD_USER = createActionName('ADD_USER');
const REMOVE_USER = createActionName('REMOVE_USER');
const EDIT_USER = createActionName('EDIT_USER');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

export const loadUsers = (payload) => ({ payload, type: LOAD_USERS });
export const addUser = (payload) => ({ payload, type: ADD_USER });
export const removeUser = (payload) => ({ payload, type: REMOVE_USER });
export const editUser = (payload) => ({ payload, type: EDIT_USER });

/* thunk creators */
export const fetchPublishedUsers = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted({ name: 'LOAD_USERS' }));

    Axios.get(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
    )
      .then((res) => {
        dispatch(loadUsers(res.data));
        dispatch(fetchSuccess({ name: 'LOAD_USERS' }));
      })
      .catch((err) => {
        dispatch(
          fetchError({ name: 'LOAD_USERS', error: err.message || true })
        );
      });
  };
};
export const addUserRequest = (data) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'ADD_USER' }));
    try {
      await Axios.post(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`,
        data
      )
        .then((res) => {
          dispatch(addUser(data));
          dispatch(fetchSuccess({ name: 'ADD_USER' }));
        });
    } catch (err) {
      dispatch(fetchError({ name: 'ADD_USER', error: err.message || true }));
    }
  };
};
export const removeUserRequest = (id) => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'REMOVE_USER' }));
    try {
      await Axios.delete(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`
      );
      dispatch(removeUser(id));
      dispatch(fetchSuccess({ name: 'REMOVE_USER' }));
    } catch (err) {
      dispatch(fetchError({ name: 'REMOVE_USER', error: err.message || true }));
    }
  };
};
export const editUserRequest = (data) => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'EDIT_USER' }));
    try {
      await Axios.put(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`,
        data
      );
      dispatch(fetchSuccess({ name: 'EDIT_USER' }));
    } catch (err) {
      dispatch(fetchError({ name: 'EDIT_USER', error: err.message || true }));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...statePart, data: [...action.payload] };
    case ADD_USER:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case REMOVE_USER:
      return {
        ...statePart,
        data: statePart.data.filter((user) => user.id !== action.payload),
      };
    case EDIT_USER: {
      const newStatePart = statePart.data.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            user: action.payload.name,
          };
        }
        return item;
      });
      return {
        data: newStatePart,
      };
    }
    case FETCH_START: {
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            active: false,
            error: false,
          },
          data: action.payload,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            active: false,
            error: action.payload,
          },
        },
      };
    }
    default:
      return statePart;
  }
};
