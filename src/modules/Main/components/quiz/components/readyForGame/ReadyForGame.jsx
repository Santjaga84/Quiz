import React from 'react';
import {
    ReadyText,
    ButtonWrapper,
    ReadyForGameWrapper,
} from './styledComponents';
import CustomButton from './../../../../../../customComponents/customButton/CustomButton'
import colors from './../../../../../../manager/themeManager/colors'
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserReadyToStartQuizStore } from '../../../../../../store/reduser/quizReduser';

const ReadyForGame = ({
    
    
}) => {

   const {isUserReadyToStartQuiz} = useSelector(state => state.quizState)
    const dispatch = useDispatch();

    const handleStart = () => {
   
    //вызываеться action из saga
    dispatch(setIsUserReadyToStartQuizStore(!isUserReadyToStartQuiz));
    
  };

    return (
        <ReadyForGameWrapper>
            <ReadyText
                children={
                    isUserReadyToStartQuiz
                        ? 'Ready to start The Quiz'
                        : 'START if you are ready to start Quiz'
                }
            />
            <ButtonWrapper>
                <CustomButton
                    text={isUserReadyToStartQuiz ? 'CANCEL' : 'START'}
                    callback={() => handleStart()}
                    isInversionTextColor={isUserReadyToStartQuiz}
                    backgroundColor={isUserReadyToStartQuiz && `${colors.brandBgColor}`}
                />
            </ButtonWrapper>
        </ReadyForGameWrapper>
    );
};

export default ReadyForGame;
