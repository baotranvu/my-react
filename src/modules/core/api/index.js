import api from '../../../api/apimanagement';
import {STATUS_CODE} from '../../../config/constant';
export async function getRoleList(){
    try {
      
        const response = await api.get('/api/Roles');
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