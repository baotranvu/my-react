
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { STATUS_CODE } from '@/config/constant'
import store from '../../../redux';
import { useNavigate } from 'react-router-dom';
import { updateNotiModal, updateNotiModalConfig } from '../redux/modal';

export const handleUpload = async (image) => {
    if(!image){
        return null;
    }
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
        (error) => {
            console.log(error);
            return null;
        },
        () => {
            getDownloadURL(storageRef).then((url) => {
                return url;
            });
        }
    );
}
export const storeLocal = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

export  const getLocal = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

/**
 * Removes the given keys from localStorage.
 * @param keys The keys to remove.
 * @returns void
 */
export const removeLocal = (keys)=> {
    if(keys && keys.length){
        Array(keys).forEach(key => {
            localStorage.removeItem(key);   
        });
    }
}



//create function base above with session storage

export const storeSession = (key, value) => {
    if( typeof value === 'string' ){
        return sessionStorage.setItem(key, value)
    }
    return sessionStorage.setItem(key, JSON.stringify(value));
}

export const getSession = (key) => {
    return sessionStorage.getItem(key);
}

export const removeSession = (key) => {
    return sessionStorage.removeItem(key);
}

export const formatDate = (dateString) => {
   const date = new Date(dateString);
   const year = date.getFullYear();
   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
   const day = date.getDate().toString().padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;
   return formattedDate;
};
export function handleError(error) {
    const code = error.response.status;
    if (code === STATUS_CODE.FORBIDDEN) {
      // Redirect to the previous page
        return window.history.back();
    } 
    if (code === STATUS_CODE.UNAUTHORIZED) {
      // Redirect to '/' or any other desired route
        return  window.location.href = '/';
    } 
      // Handle other error cases
      return {
        isSuccess: false,
        data: null,
        error: error.message,
      };
    
  }