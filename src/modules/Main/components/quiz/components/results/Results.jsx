import React, { useEffect } from 'react';
import CustomButton from './../../../../../../customComponents/customButton/CustomButton'
import {
    User,
    Scores,
    ScoresHeader,
    ButtonWrapper,
    ResultsWrapper,
    ScoresContainer,
} from './styledComponents';
import UserScores from './components/userScores/UserScores';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setShowResults,setAnswersCountStore, setCorrectAnswersCountStore } from '../../../../../../store/reduser/quizReduser';
import { useNavigate } from 'react-router';
import { setIsUserReadyToStartQuizStore } from '../../../../../../store/reduser/quizReduser';
import { setIsFinishQuiz } from '../../../../../../store/reduser/quizReduser';


const Results = () => {

    const usersResultsList = useSelector(state => state.quizState.results)
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
     
    useEffect(() => {
        dispatch(setShowResults(true));
        return () => {
            dispatch(setShowResults(false));
        };
     
    }, []);

   
    const handleFinish = () => {
        navigate('/');
        dispatch(setIsUserReadyToStartQuizStore(false));
        dispatch(setShowResults(false));
        dispatch(setAnswersCountStore(0));
        dispatch(setCorrectAnswersCountStore(0));
        
        localStorage.setItem('quizData', JSON.stringify({
         data: {
            isUserReadyToStartQuiz: false,
            currentUserReadiness: {},
        }}));

        dispatch(setIsFinishQuiz(true))

    }

 
    return (
        <ResultsWrapper>
            {usersResultsList.length ?
                <ScoresContainer>
                    <ScoresHeader>
                        <User children={'user'}/>
                        <Scores children={'scores'}/>
                    </ScoresHeader>
                         {
                            Object.values(usersResultsList).map((user,key) =>
                                
                            <UserScores
                                key={key}
                                name={user.users.displayName}
                                image={user.users.photoURL}
                                scores={user.users.points}
                            />
                         )}
                </ScoresContainer>
                : null
            }
            <ButtonWrapper>
                <CustomButton
                    text={'ok'}
                    callback={() => 
                    
                    handleFinish()
                    }
                    
                />
            </ButtonWrapper>
        </ResultsWrapper>
    );
};

export default Results;
