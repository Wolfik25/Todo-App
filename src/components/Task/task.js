import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

class Task extends React.Component {
    render() {
        const { task, onDeleted, onToggleDone, onEditMode, children } = this.props;
        const { id, done, isEditing, label, time } = task;

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
                    <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id, 'completed')} />
                    <label>
                        <span className="title" onClick={onToggleDone}>{label}</span>
                        <span className="description" >
                            <button className="icon icon-play"></button>
                            <button className="icon icon-pause"></button>
                            00:00
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
