//create react component function return HelloWorld

import store  from './redux';
import { StrictMode, } from 'react';
import { Provider } from 'react-redux';
import ProtectionRoutes from './router';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@modules/auth/pages/login';
import  Controller from './router/controller';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#233044',
      paper: '#192630',
    }
  },
});

export function App(){
    return(
        <StrictMode>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Provider store={store}>
                    <BrowserRouter>
                        <Controller/>
                        <ProtectionRoutes />
                        <Routes>
                            <Route
                                path="/"
                                element={<Login />}
                                exact={true}
                            />
                        </Routes>   
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
           
        </StrictMode>
    )
}


