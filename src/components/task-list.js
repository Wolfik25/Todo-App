import Task from './task';


const TaskList = ({ todos, onDeleted }) => {
    
    const elements = todos.map((el) => {
        const { id, ...elProps } = el;
        return (
            <Task {...elProps} key={id}
                onDeleted={() => onDeleted(id) } />
    )

})

    return (
        <ul className="todo-list">
            { elements }
            {/* <li className="completed">
                <div className="view">
                    
                    <label>
                        <span className="description">Completed task</span>
                        <span className="created">created 17 seconds ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
            </li>
            <li className="editing">
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description">Editing task</span>
                        <span className="created">created 5 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
               <input type="text" className="edit" value="Editing task" />
            </li> */}
        </ul>
    );
}

export default TaskList;