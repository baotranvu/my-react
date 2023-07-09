import api  from '@/api/apimanagement'
import { STATUS_CODE } from '../../../config/constant'

export async function getListUser(){
  try {
    const response = await api.get('/api/Users');
    const { code, message, content } = response.data;
    const formatedResponse = {
      isSuccess: code === STATUS_CODE.SUCCESS,
      data: code === STATUS_CODE.SUCCESS ? content : null,
      error: code !== STATUS_CODE.SUCCESS ? message : null,
    };
    return formatedResponse;
  } catch (error) {
    return { isSuccess: false, data: null, error };
  }
}

export async function createUser(data){
  try {
    const response = await api.post('/api/User',{
      ...data,
    });
    const { code, message, content } = response.data;
    const formatedResponse = {
      isSuccess: code === STATUS_CODE.SUCCESS,
      data: code === STATUS_CODE.SUCCESS ? content : null,
      error: code !== STATUS_CODE.SUCCESS ? message : null,
    };
    return formatedResponse;
  } catch (error) {
    console.log('error', error);
    return { isSuccess: false, data: null, error: error.message };
  }
}
export async function updateUser(data){
  try {
    const response = await api.post('/api/User',{
      data: data,
    },);
    const { code, message, content } = response.data;
    const formatedResponse = {
      isSuccess: code === STATUS_CODE.SUCCESS,
      data: code === STATUS_CODE.SUCCESS ? content : null,
      error: code !== STATUS_CODE.SUCCESS ? message : null,
    };
    return formatedResponse;
  } catch (error) {
    console.log('error', error);
    return { isSuccess: false, data: null, error: error.message };
  }
}

export async function getUserInfo(id){
  try {
    const response = await api.get(`/api/User/${id}`);
    const { code, message, content } = response.data;
    const formatedResponse = {
      isSuccess: code === STATUS_CODE.SUCCESS,
      data: code === STATUS_CODE.SUCCESS ? content : null,
      error: code !== STATUS_CODE.SUCCESS ? message : null,
    };
    return formatedResponse;
  } catch (error) {
    console.log('error', error);
    return { isSuccess: false, data: null, error: error.message };
  }
}

export async function updateUserStatus(id, status){
  try {
    const response = await api.put(`/api/User/update-status?statusEnum=${status}`,id,);
    const { code, message, content } = response.data;
    const formatedResponse = {
      isSuccess: code === STATUS_CODE.SUCCESS,
      data: code === STATUS_CODE.SUCCESS ? content : null,
      error: code !== STATUS_CODE.SUCCESS ? message : null,
    };
    return formatedResponse;
  } catch (error) {
    console.log('error', error);
    return { isSuccess: false, data: null, error: error.message };
  }
}

