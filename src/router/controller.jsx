import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLE_LIST, ROLE_KEY } from '@/config/constant';
import { getUserInfo } from '../modules/auth/utils';
const Controller = () => {
  const navigate = useNavigate();
  const userInfo =  getUserInfo();
    const role = userInfo ? userInfo[ROLE_KEY] : null;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    
    if (!isAuthenticated) {
      navigate('/');
    } 
  }, []);

  return null;
};

export default Controller;
