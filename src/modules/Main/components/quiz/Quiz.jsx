import React from 'react';
import { QuizWrapper } from './styledComponents';
import Game from './components/game/Game';
import Results from './components/results/Results';
import ReadyForGame from './components/readyForGame/ReadyForGame';

const Quiz = ({
    isShowResults,
    isQuizInProcess,
    setIsReadyForGame,
    isUserReadyToStartQuiz,
}) => {
    return (
        <QuizWrapper>
            {isQuizInProcess ?
                !isShowResults ?
                    <Game/>
                    :
                    <Results/>
                :
                <ReadyForGame
                    callback={setIsReadyForGame}
                    isUserReadyToStartQuiz={isUserReadyToStartQuiz}
                />
            }
        </QuizWrapper>
    );
};

export default Quiz;
