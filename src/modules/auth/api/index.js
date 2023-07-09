import api  from '@/api/apimanagement'
import { STATUS_CODE } from '@/config/constant'
import  {setToken} from '../utils';
import store from '@/redux';
export async function login({ email, password }) {
  try {
 
    const response = await api.post('/api/User/login', { email, password });
    const { code, message, content } = response.data;
    const isSuccess = code === STATUS_CODE.SUCCESS;
    
    setToken(content.token);
    store.dispatch({
      type: 'auth/updateAdmin',
    })
    return { isSuccess, data: null, error: isSuccess ? null : message };
  } catch (error) {
    console.log('error', error);
    return { isSuccess: false, data: null, error: error.message };
  }
  
}