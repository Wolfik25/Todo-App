import TasksFilter from './tasks-filter';

const Footer = ({ todoCount, filter, onToggleFilterHandler, onClearCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{ todoCount} items left</span>
            <TasksFilter filter={filter}
                onToggleFilterHandler={onToggleFilterHandler}/>
            <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>
    )
}

export default Footer;