import React, { useEffect } from 'react';
import {
    LoginWrapper,
    ButtonContainer,
  
} from './styledComponents';
import CustomButton from './../../customComponents/customButton/CustomButton';
import googleImage from './../../images/google.svg';
import colors from '../../manager/themeManager/colors';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../firebase/authorizationMethods';
import { signInWithGoogle } from '../../store/reduser/userReducer';


const Login = () => {


const navigate = useNavigate();
const dispatch = useDispatch();
 const {user} = UserAuth();



const handleSignInWithGoogle = async () => {
    try {
//вызываеться action из saga

dispatch(signInWithGoogle());


} catch (error) {
   console.log(error);
    }
  };

   useEffect(() => {
    if (user != null) {
      navigate('/main');
    }
  }, [user]);


    return (
        <LoginWrapper>
            <ButtonContainer>
                <CustomButton
                    text={'Login with Google'}
                    image={googleImage}
                    callback={handleSignInWithGoogle}
                    borderColor={colors.loginButtonBorderColor}
                    isInversionTextColor
                    //prompt="select_account"                     
                >
                </CustomButton>
            </ButtonContainer>

        </LoginWrapper>
    )
};

export default Login
