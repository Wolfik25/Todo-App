import TasksFilter from '../TasksFilter/tasks-filter';
import Proptypes from 'prop-types';
import './footer.css'

const Footer = ({ todoCount, filter, onToggleFilterHandler, onClearCompleted }) => {
    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <TasksFilter filter={filter}
                onToggleFilterHandler={onToggleFilterHandler} />
            <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>
    )
}

Footer.propTypes = {
    todoCount: Proptypes.number,
    filter: Proptypes.string,
    onToggleFilterHandler: Proptypes.func,
    onClearCompleted: Proptypes.func,
}
export default Footer;