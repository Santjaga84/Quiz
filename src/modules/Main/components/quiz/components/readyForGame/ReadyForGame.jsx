import React, {useEffect} from 'react';
import {
    ReadyText,
    ButtonWrapper,
    ReadyForGameWrapper,
} from './styledComponents';
import CustomButton from './../../../../../../customComponents/customButton/CustomButton'
import colors from './../../../../../../manager/themeManager/colors'
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserReadyToStartQuizStore,
         setStartQuiz,
} from '../../../../../../store/reduser/quizReduser';
import { useNavigate } from 'react-router';
import { sendQuestionsAnswersFromFirebase } from '../../../../../../store/reduser/quizReduser';


const ReadyForGame = ({
    
    
}) => {

   const {isUserReadyToStartQuiz} = useSelector(state => state.quizState)
   const { isStartQuiz } = useSelector(state => state.quizState)
   const dispatch = useDispatch();

   const navigate = useNavigate();

//Для обновления страницы
    useEffect(() => {
      const quizData = JSON.parse(localStorage.getItem('quizData'));
      const isUserReadyToStartQuiz = quizData?.data?.isUserReadyToStartQuiz;
      
      if (isUserReadyToStartQuiz !== null) {
        dispatch(setIsUserReadyToStartQuizStore(isUserReadyToStartQuiz));
      }
     }, []);


    const handleReady = () => {
          //вызываеться action из saga
     dispatch(setIsUserReadyToStartQuizStore(!isUserReadyToStartQuiz));
    
    };

    const handleStart = () => {
         navigate('/game');
         dispatch(setStartQuiz())
         //dispatch(sendQuestionsAnswersFromFirebase(isUserReadyToStartQuiz))
    }

    return (
        <ReadyForGameWrapper>
            <ReadyText
                children={
                    isUserReadyToStartQuiz
                        ? 'Ready to start The Quiz'
                        : 'START if you are ready to start Quiz'
                }
            />
            <ButtonWrapper >
                <CustomButton
                    text={isUserReadyToStartQuiz ? 'CANCEL' : 'READY'}
                    callback={() => handleReady()}
                    isInversionTextColor={isUserReadyToStartQuiz}
                    backgroundColor={isUserReadyToStartQuiz && `${colors.brandBgColor}`}
                />
                <div style={{ display: isStartQuiz ? 'block' : 'none', marginTop: '10px'}}>
                <CustomButton
                    text={isStartQuiz ? 'START' : ''}
                    callback={() => handleStart()}
                    isInversionTextColor={isStartQuiz}
                    backgroundColor={isStartQuiz && `${colors.brandBgColor}`}
                />
                </div>
            </ButtonWrapper>
            
        </ReadyForGameWrapper>
    );
};

export default ReadyForGame;
