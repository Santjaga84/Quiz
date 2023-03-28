import React from 'react';
import {
    StyledLink,
    NavbarWrapper,
    ButtonContainer,
} from './styledComponents';
import CustomButton from './../../customComponents/customButton/CustomButton';
import CustomImage from './../../customComponents/customImage/CustomImage';
import logo from './../../images/q.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signOutWithGoogle } from '../../store/reduser/userReducer';
import { UserAuth } from '../../firebase/authorizationMethods';
import { useEffect } from 'react';



function Navbar()  {
  
const { user } = UserAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const handleSignOutWithGoogle = async () => {
    try {
      dispatch(signOutWithGoogle());
          
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user]);

    return (
        <NavbarWrapper>
                 {user ? 
                    <>
                        <CustomImage
                            image={logo}
                            width={'55px'}
                            height={'55px'}
                            margin={'0 40px'}
                        />
                        <ButtonContainer>
                            <StyledLink to={'/main'}>
                                <CustomButton
                                    text={'Logout'}
                                    callback={handleSignOutWithGoogle}
                                />
                            </StyledLink>
                        </ButtonContainer>
                    </>
                     :
                    <StyledLink to={'/'}>
                        <CustomImage
                            image={logo}
                            width={'55px'}
                            height={'55px'}
                            margin={'0 40px'}
                        />
                    </StyledLink>
                 }
        </NavbarWrapper>
    )
};

export default Navbar;
