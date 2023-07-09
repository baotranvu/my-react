import api  from '@/api/apimanagement'
import { STATUS_CODE } from '@/config/constant'


export async function createInvoice(data){
    try {
      const response = await api.post('/api/Invoice',{
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

export async function getListInvoiceByStore(id){
  try {
    const response = await api.get(`/api/Invoices?storeId=${id}`);
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

export async function updateInvoiceStatus(id, invoiceStatus){
  try {
    const response = await api.put(`/api/Invoice/update-status`,{
      id,
      invoiceStatus
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