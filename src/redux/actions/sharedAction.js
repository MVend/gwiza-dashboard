/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthToken from '../../utils/authToken';
import creator from './creator';

export const sharedAction = (method, endpoint, actionType, data) => async (dispatch) => {
  try {
    const baseUrl = 'http://localhost:9000/api';
    axios.defaults.headers['x-auth-token'] = AuthToken.getToken();
    dispatch(creator(actionType, { isLoading: true }));
    const res = await axios[method](baseUrl + endpoint, data);
    return dispatch(creator(actionType, { data: res?.data }));
  } catch (e) {
    console.error(e);
    dispatch(creator(actionType, { error: e.response?.data?.error }));
    return toast.error(e.response?.data?.error);
  }
};
