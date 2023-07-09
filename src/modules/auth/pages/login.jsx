
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import {login} from '../api/index'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateLoading } from "@modules/core/redux/loading";
import { updateNotiModalConfig, updateNotiModal } from '@modules/core/redux/modal';
import NotiModal from '@modules/core/components/NotiModal';
import LoadingLayout from "@modules/core/layouts/LoadingLayout";
import logo from '@assets/img/logo.png';
import banner from '@modules/auth/assets/img/banner.jpg'
import '../assets/css/main.css'
import { getUserInfo, removeToken } from "../utils";
import { ROLE_KEY, ROLE_LIST } from "@/config/constant";
function Login() {
    useEffect(() => {
        document.title = "Đăng nhập"
        removeToken()
    },[])
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
   
    async function handleLogin(){
        dispatch(updateLoading(true));
        const response = await login({
            email: email,
            password: password
        })
        if(response.isSuccess){
            dispatch({
                type: 'auth/login',
            });
            
            const userInfo = getUserInfo();
            const role = userInfo ? userInfo[ROLE_KEY] : null;
            if(role){
                switch(role){
                    case ROLE_LIST.ADMIN:
                        navigate('/user')
                        break;
                    case ROLE_LIST.BRAND_MANAGER:
                        navigate('/brand')
                        break;
                    default:
                        navigate('/')
                        break;
            }
        }
            dispatch(updateLoading(false));
        }else{
            dispatch(updateLoading(false));
            console.error(response.error);
            const modalConfig = {
                title: "Thông báo",
                body: "Đăng nhập không thành công",
                btnCloseText: "Xác nhận",
            }
            dispatch(updateNotiModalConfig(modalConfig));
            dispatch(updateNotiModal(true));
        }
        
    }
    return (
        <LoadingLayout>
            <div className="bg-custom">
            <div className="login-wrapper">
        <div className="col">
            <img src={banner} alt="login-banner" className="image-banner" />
        </div>
        <div className="col">
            <div className="login-form">
            <Figure.Image
            width={128}
            height={128}
            alt="avatar"
            src={logo}
            className='filter--white'
            
          />
                <div className="title-wrapper">
                    <h1 className="login-title">Đăng nhập</h1>
                    <p className="login-subtitle">Chào mừng bạn quay trở lại!</p>
                </div>
                <Form className="login-control">
                    <div className="form-group">
                        <label className="form-group__label" htmlFor="account">Tài khoản</label>
                        <div className="form-group__input">
                            <input className="form-input" autoComplete="off" type="text" id="account"
                                placeholder="Tên đăng nhập" onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>

                    </div>
                    <div className="form-group">
                        <label className="form-group__label" htmlFor="password">Mật khẩu</label>
                        <div className="form-group__input">
                            <input className="form-input" autoComplete="off" type="password" id="password"
                                placeholder="Nhập mật khẩu" onChange={(e)=>{setPassword(e.target.value)}} />
                        </div>
                    </div>

                </Form>
                <button className="login-button" onClick={handleLogin}>Đăng nhập</button>
            </div>
        </div>
        </div>
        </div>
        <NotiModal/>
        </LoadingLayout>
    );
  }
  
  export default Login;
  