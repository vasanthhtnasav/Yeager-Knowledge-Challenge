import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';
import '../styles/Main.css';

export default function Main() {

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value));
        }
    }

    return (
        <div className='container'>
    <h1 className='title text-light'>PROVE YOUR WORTH, FIGHT FOR YOUR KNOWLEDGE</h1>

<ol>
    <li>    Prepare yourself for the ultimate test, face 10 questions head-on</li>
    <li>    There's no turning back, no regrets for wrong answers</li>
    <li>    Show the world the fire burning in your heart, and unveil your true knowledge</li>
</ol>

            <form id="form">
                <input ref={inputRef} className="userid" type="text" placeholder='USER NAME' />
            </form>

            <div className='start'>
                <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
            </div>
        </div>
    );
}
