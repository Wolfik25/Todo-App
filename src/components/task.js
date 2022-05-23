import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

class CreateDate {
    beginDate = formatDistanceToNow(new Date())
}
class Task extends React.Component {
    state = {
    done: false,
}

    onLabelClick = () => {
        this.setState(({ done }) => {
            return {
                done: !done
            }
        })
    }

    render() {
        const { label, onDeleted } = this.props;
        const { done } = this.state;

        let classNames;

        if ( done ) {
            classNames='completed'
        }
        return (
            <li className={classNames}>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description"
                    onClick={this.onLabelClick}
                    >{label}</span>
                    <span className="created">Created {new CreateDate().beginDate} ago</span>
                </label>
                <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"
                    onClick={onDeleted}></button>
                </div>
            </li>
        )
    }
}

export default Task;