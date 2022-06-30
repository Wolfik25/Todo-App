import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './task.css';

function Task({ task, onDeleted, onToggleDone, onEditMode, children }) {
    const { id, done, isEditing, label, time } = task;

    const [min, setMin] = useState(task.timerMin);
    const [sec, setSec] = useState(task.timerSec);
    const [status, setStatus] = useState(0);
    const [timer, setTimer] = useState(false);

    useEffect(() => {
        let count;
        if (timer) {
            count = setInterval(() => { onStartTimer(sec, min); }, 1000);
        }
        if (!timer) {
            clearInterval(count);
        }
        return () => {
            clearInterval(count);
        };
    }, [timer, sec]);

    const runTimer = () => {
        setTimer(true);
    };

    function onStartTimer(sec, min) {
        if (sec === 59) {
            min++;
            sec = 0;
            setSec(sec);
            setMin(min);
        } else {
            sec++;
            setSec(sec);
            setStatus(1);
        }
        if (min === 60) {
            setMin(0);
        }
    };

    const onStopTimer = () => {
        setTimer(false);
        setStatus(0);
    };

    let classNames;

    if (done) {
        classNames = 'completed';
    }
    if (isEditing) {
        classNames = 'editing';
    }

    return (
        <li className={classNames}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={done} onChange={() => {
                    onToggleDone(id, 'completed');
                    onStopTimer();
                }} />
                <label onClickCapture={(e) => e.preventDefault()}>
                    <span className="title" onClickCapture={() => {
                        onToggleDone(id, 'completed');
                        onStopTimer();
                    }}>{label}</span>
                    <span className="description" >
                        {(!status)
                            ? <button className="icon icon-play" onClick={runTimer} disabled={done}></button>
                            : <button className="icon icon-pause" onClick={onStopTimer} disabled={done}></button>}
                        {(min >= 10) ? min : '0' + min}:{(sec >= 10) ? sec : '0' + sec}
                    </span>
                    <span className="description">
                        Created
                        {` ${formatDistanceToNow(time, { includeSeconds: true })}`} ago
                    </span>
                </label>
                <button className="icon icon-edit" onClick={onEditMode} />
                <button className="icon icon-destroy" onClick={onDeleted} />
            </div>
            {task.isEditing && children}
        </li>
    );
}

Task.propType = {
    tasks: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        isEditing: PropTypes.bool.isRequired,
        time: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onEditMode: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    childre: PropTypes.element.isRequired,
};

export default Task;
