import React from 'react'; 
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import style from './LoginButton.module.css';

const LoginButton = () => {   

    const { loginWithRedirect } = useAuth0();    

    return (
        <Link 
        className={style.login} 
        onClick={() => loginWithRedirect()}
        to=''>
            <ion-icon size="large" name="person-outline"></ion-icon>
        </Link>
    );

};

export default LoginButton;
