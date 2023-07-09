import api from '@/api/apimanagement'
import jwt_decode from 'jwt-decode';
import { ROLE_LIST, ROLE_KEY } from '@/config/constant';

export const setToken = (token) => {
  sessionStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeToken = () => {
    console.log('removeToken');
    sessionStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
}

// Function to retrieve the token from localStorage
export const getToken = () => {
  return sessionStorage.getItem('token');
};

export function getUserInfo(){
    const token = getToken();
    if(token) {
        const decoded = jwt_decode(token);
        return decoded;
    }
    return null;
}

export const isAdmin = () => {
    const useInfo = getUserInfo();
    return useInfo ? useInfo[ROLE_KEY] === ROLE_LIST.ADMIN : false;
  }

// Check if token exists in localStorage on page load
const token = getToken();
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Listen for the 'beforeunload' event to save the token before page refresh
// window.addEventListener('beforeunload', function(event) {
//     const token = getToken();
//     if (token) {
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       getUserInfoFromToken(token);
//     }
// });


