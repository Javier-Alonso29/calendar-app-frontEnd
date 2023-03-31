import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { onLogOutCalendar } from '../actions/calendarActions';
import calendarApi from '../api/calendarApi';
import { clearErrorMessage, onChecking, onLogin, onLogOut } from '../store/auth/authSlice';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {

        dispatch( onChecking() )

        try {
            
            const {data} = await calendarApi.post('/auth/login', {email, password})

            console.log(data);
            
            localStorage.setItem('token', data.token )
            localStorage.setItem('token-init-date', new Date().getTime() )
            
            dispatch( onLogin({ name: data.name, uid:data.uid }) )

        } catch (error) {
            dispatch( onLogOut('Credenciales incorrectas') )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 100)
        }

    }

    const startRegister = async({registerName:name, registerEmail:email, registerPassword:password}) => {

        try {
            const {data} = await calendarApi.post('/auth/new', {name, email, password})
            localStorage.setItem('token', data.token )
            localStorage.setItem('token-init-date', new Date().getTime() )
            
            dispatch( onLogin({ name: data.name, uid:data.uid }) )

        } catch (error) {
            const errors = []
            if(error.response.data.msg){
                errors.push(error.response.data.msg)
            }else{
                
                for (const key in error.response.data.errors) {
                    const errorMsg = error.response.data.errors[key].msg;
                    errors.push(errorMsg)
                }

            }
            dispatch( onLogOut(errors.join('<br>')) )
        }

    }

    const checkAuthToken = async() =>{

        const token = localStorage.getItem('token')

        if(!token) return dispatch( onLogOut() )

        try {
            const {data} = await calendarApi.get('auth/renew')

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch( onLogin({ name: data.name, uid:data.uid }) )

        } catch (error) {
            localStorage.clear();
            dispatch( onLogOut() )
        }


    }

    const startLogOut = () => {

        localStorage.clear();
        dispatch( onLogOutCalendar() )
        dispatch( onLogOut() )

    }
  

    return {
        //* propiedades
        status, 
        user, 
        errorMessage,

        //* Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogOut
    }

}
