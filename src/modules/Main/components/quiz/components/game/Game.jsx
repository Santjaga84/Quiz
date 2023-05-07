import React, { useState, useEffect } from 'react';
import {
    GameWindow,
    GameWrapper,
    QuestionText,
    AnswerButtons,
    QuestionWrapper,
    AnswerResultImages,
} from './styledComponents';
import CustomImage from './../../../../../../customComponents/customImage/CustomImage';
import CustomButton from './../../../../../../customComponents/customButton/CustomButton';
import correctAnswerImage from './../../../../../../images/correct-answer-image.svg.png'
import notCorrectAnswerImage from './../../../../../../images/not-correct-answer-image.png';
import colors from './../../../../../../manager/themeManager/colors'
import { useSelector, useDispatch } from 'react-redux';
import { 
    setAnswersCountStore,
    setIsAnswerResultListStore,
    setUpdateQuizResultsFirebase,
    
} from '../../../../../../store/reduser/quizReduser';

import Results from '../results/Results';
//import { useNavigate } from 'react-router';



const Game = () => {

    const dispatch = useDispatch();
    //const navigate = useNavigate();


    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
  
    const [isQuizFinish, setIsQuizFinish] = useState(false);
    const [isStartAnswersClick, setIsStartAnswersClick] = useState(true);
  
    const questions  = useSelector(state => state.quizState.currentQuestionsList)
   
    const correctAnswerList = useSelector(state => state.quizState.correctAnswerList)
   
    const answerResultCount = useSelector(state => state.quizState.answerResultCount)
   
    const answerResultList = useSelector(state => state.quizState.isAnswerResultList)
    
    const usersResultsList = useSelector(state => state.quizState.results)

    const userId = useSelector(state => state.quizState.currentUserReadiness.userIdQuiz)

       
        const currentCount = usersResultsList.map(user => user.currentQuestion);
        const questionPointsEqual = currentCount.every(point => point === currentCount[0]); 
         
        const filteredUsers = Object.values(usersResultsList).filter(user => user.users.uid === userId);
        const users = filteredUsers[0];
        let correctAnswersCount = users.users.points;    
       
       
    
    useEffect(() => {
    if(isStartAnswersClick){
    const timer = setTimeout(() => {
       
    if(questions && (questions.length === answerResultCount)){
        setIsQuizFinish(true)
        
        return
        
       }else{  
    setQuestionIndex(answerResultCount + 1);
    setIsDisabled(false); 

    dispatch(setAnswersCountStore(answerResultCount + 1));
    dispatch(setIsAnswerResultListStore(false))

    dispatch(setUpdateQuizResultsFirebase({
                answerResultCount:answerResultCount + 1,
                correctAnswersCount:correctAnswersCount,
               
            } ));
        }
    }, 5000);
    return () => clearTimeout(timer); 
     }
      }, [questionIndex]);
     
    

    useEffect(() => {

        const question = questions[questionIndex];
        setCurrentQuestion(question);
        if (question && question.answers && question.answers.length > 0) {
        setAnswers(question.answers || [])
        setIsDisabled(false);
                
        }
         
    }, [questionIndex, questions]);



    useEffect(() =>{
        
        if(questions && (questions.length === answerResultCount)){
            if(questionPointsEqual){
            setIsQuizFinish(true)
            setIsDisabled(true);
            
            }
      }

    },[questions,answerResultCount] )

 
    const handleClick = (answer) => {
       
        const correctAnswer = correctAnswerList[questionIndex];
        const isCorrectAnswer = answer === correctAnswer;
        
        setIsStartAnswersClick(false)
       
        const filteredUsers = Object.values(usersResultsList).filter(user => user.users.uid === userId);
        const users = filteredUsers[0];
        correctAnswersCount = users.users.points;
        
            setIsDisabled(true);
                 
            dispatch(setAnswersCountStore(answerResultCount + 1));
          
            if (answerResultCount <= questions.length) {
            if (isCorrectAnswer) {
              
            dispatch(setUpdateQuizResultsFirebase({
                answerResultCount:answerResultCount + 1,
                correctAnswersCount:correctAnswersCount + 1,
                
            } ));
            dispatch(setIsAnswerResultListStore(isCorrectAnswer))    
            }else{
           
            dispatch(setUpdateQuizResultsFirebase({
                answerResultCount:answerResultCount + 1,
                correctAnswersCount:correctAnswersCount,
                
            } ));    
            dispatch(setIsAnswerResultListStore(isCorrectAnswer))  
            }
        }
     
        setTimeout(() => {
           setQuestionIndex(answerResultCount + 1);
           setIsStartAnswersClick(true)
        }, 1000);
        };


        return isQuizFinish && questionPointsEqual ? <Results />
    
        : (
        <GameWrapper>
            {answerResultList.length ?
                <AnswerResultImages>
                    {answerResultList.map((item, i) => {
                        
                        return (item.isAnswerResultList === null || item.isAnswerResultList === undefined || item.isAnswerResultList === false)
                            ? 
                              <CustomImage
                                key={i}
                                image={notCorrectAnswerImage}
                                width={'31px'}
                                height={'31px'}
                                padding={'5px'}
                            />
                             :  
                            <CustomImage
                                key={i}
                                image={correctAnswerImage}
                                width={'31px'}
                                height={'31px'}
                                padding={'5px'}
                            />
                    })}
                </AnswerResultImages>
                : 
                 null 
             }
            <GameWindow>
            {currentQuestion && (
                <QuestionWrapper>
                    <QuestionText
                        children={currentQuestion.question}
                    />
                </QuestionWrapper>
                )}
                <AnswerButtons>
                    {answers?.map((answer, i) =>
                    
                        <CustomButton
                            key={i}
                            text={answer}
                            isDisabled={isDisabled}
                            callback={() => handleClick(answer)}
                            activeBackgroundColor={answer !== correctAnswerList && `${colors.wrongAnswerBgColor}`}
                            
                        />
                    )}
                </AnswerButtons>
                
            </GameWindow>
        </GameWrapper>
        
    );
};

export default Game;
