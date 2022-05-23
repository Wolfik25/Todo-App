import formatDistanceToNow from 'date-fns/formatDistanceToNow';

class CreateDate {
    beginDate = formatDistanceToNow(new Date())
}

const Task = ({ value }) => {
    return (
        <li>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{value}</span>
                    <span className="created">Created {new CreateDate().beginDate} ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
        </li>
    )
}

export default Task;