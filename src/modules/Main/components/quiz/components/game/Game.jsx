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
    setCorrectAnswersCountStore,
    setAnswersCountStore,
    setIsAnswerResultListStore,
    sendQuestionsAnswersFromFirebase,
    setUpdateQuizResultsFirebase

} from '../../../../../../store/reduser/quizReduser';
import { sendQuizQuestionsAnswersFirebase,
         updateQuizResultsFirebase } from '../../../../../../firebase/quizFirebase';



const Game = () => {

    const dispatch = useDispatch();
    
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    //const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

    const [isQuizFinish, setIsQuizFinish] = useState(false);

    
    //Массив вопросов и ответов 
    const questions  = useSelector(state => state.quizState.currentQuestionsList)
    //Массив правильных ответов
    const correctAnswerList = useSelector(state => state.quizState.correctAnswerList)
    //Количество ответов
    const correctAnswersCount = useSelector(state => state.quizState.correctAnswersCount)
    //Количество правильных ответов
    const answerResultCount = useSelector(state => state.quizState.answerResultCount)
    //массив true или false полученных при ответе 
    const answerResultList = useSelector(state => state.quizState.isAnswerResultList)
    
    const isCorrectAnswer = useSelector(state => state.quizState.isCorrectAnswer)

    const docQuizFairbase = useSelector(state => state.quizState.currentUserReadiness.docQuizFairbase);

    // console.log("question",questions);
    // console.log("correctAnswerList",correctAnswerList);
    // console.log("isCorrectAnswer",isCorrectAnswer);
    // console.log("correctAnswerCount",correctAnswersCount);
    // console.log("answerResultCount",answerResultCount);
    // console.log("answerResultList",answerResultList);

    
    useEffect(() => {

        const question = questions[questionIndex];
        
        setCurrentQuestion(question);
        if (question && question.answers && question.answers.length > 0) {
        // Если массив ответов пуст или не определен, останавливаем выполнение эффекта
        setAnswers(question.answers || [])
        setIsDisabled(false);
     
        }
       
    }, [questionIndex, questions]);


    useEffect(() =>{
      
        if(questions && (questions.length === answerResultCount)){
        setIsQuizFinish(true)

      }     

    },[questions,answerResultCount] )


    const handleClick = (answer) => {
        
        const correctAnswer = correctAnswerList[questionIndex];
        const isCorrectAnswer = answer === correctAnswer;
        console.log("isCorrectAnswer2",isCorrectAnswer);
        //console.log("correctAnswerCount2",correctAnswer);
        setIsDisabled(true);
        
        if (answerResultCount <= questions.length) {
            
            if (isCorrectAnswer) {
            //количество правильных ответов   
            //correctAnswersCount = correctAnswersCount + 1  
            dispatch(setCorrectAnswersCountStore(correctAnswersCount + 1));
            //dispatch(sendQuestionsAnswersFromFirebase(answerResultCount + 1))
            //Количество ответов
            //answerResultCount = answerResultCount + 1
            dispatch(setAnswersCountStore(answerResultCount + 1));

            dispatch(setUpdateQuizResultsFirebase((correctAnswersCount + 1),docQuizFairbase));
    
            //
            dispatch(setIsAnswerResultListStore(isCorrectAnswer))    
            }else{
            dispatch(setAnswersCountStore(answerResultCount + 1));
//dispatch(setUpdateQuizResultsFirebase((correctAnswersCount + 1),docQuizFairbase));

            dispatch(setIsAnswerResultListStore(isCorrectAnswer))  
            }
    
        }
     
         setTimeout(() => {
            setQuestionIndex(prevIndex => prevIndex + 1);
        }, 1000);
    };

    return isQuizFinish ?  <div>Игра окончена</div>
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
