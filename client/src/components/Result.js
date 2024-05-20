import React, { useEffect } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';

export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    const getResult = (points) => {
        let resultText;
        let resultColor;
        if (points >= 90) {
            resultText = "Excellent";
            resultColor = "#2aff95"; // Green
        } else if (points >= 70) {
            resultText = "Very Good";
            resultColor = "#2aff95"; // Green
        } else if (points >= 50) {
            resultText = "Good";
            resultColor = "#2aff95"; // Green
        } else {
            resultText = "This world is a cruel place, try again!";
            resultColor = "#ff2a66"; // Red
        }
        return { resultText, resultColor };
    }

    const { resultText, resultColor } = getResult(earnPoints);

    /** store user result */
    usePublishResult({ 
        result, 
        username: userId,
        attempts,
        points: earnPoints,
        achived: flag ? "Passed" : "Failed" 
    });

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>戦わなければ勝てない。</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Survey Corps Member</span>
                    <span className='bold'>{userId || ""}</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points: </span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions: </span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts: </span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points: </span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Quiz Result</span>
                    <span style={{ color: resultColor }} className='bold'>{resultText}</span>
                </div>
            </div>

            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>

            <div className="container">
                {/* result table */}
                <ResultTable></ResultTable>
            </div>
        </div>
    );
}
