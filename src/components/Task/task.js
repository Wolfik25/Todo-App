import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
        const { task } = this.props;
        this.state = {
            min: task.timerMin,
            sec: task.timerSec,
            status: 0,
        };
    }

    componentWillUnmount() {
        clearInterval(this.timerMin);
        clearInterval(this.timerSec);
    }

    runTimer = () => {
        this.onStartTimer();
        this.timerMin = setInterval(this.onStartTimer, 1000);
    };

    onStartTimer = () => {
        let updateMin = this.state.min;
        let updateSec = this.state.sec;

        if (updateSec === 59) {
            updateMin++;
            updateSec = 0;
        }
        if (updateMin === 60) {
            updateMin = 0;
        }
        updateSec++;

        this.setState({
            min: updateMin,
            sec: updateSec,
            status: 1,
        });
    };

    onStopTimer = () => {
        clearInterval(this.timerMin);
        clearInterval(this.timerSec);
        this.setState({
            status: 0,
        });
    };

    render() {
        const { task, onDeleted, onToggleDone, onEditMode, children } = this.props;
        const { id, done, isEditing, label, time } = task;
        const { min, sec, status } = this.state;

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
                        this.onStopTimer();
                    }} />
                    <label onClickCapture={(e) => e.preventDefault()}>
                        <span className="title" onClickCapture={() => {
                            onToggleDone(id, 'completed');
                            this.onStopTimer();
                        }}>{label}</span>
                        <span className="description" >
                            {(status === 0)
                                ? <button className="icon icon-play" onClick={this.runTimer} disabled={done}></button>
                                : <button className="icon icon-pause" onClick={this.onStopTimer} disabled={done}></button>}
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
