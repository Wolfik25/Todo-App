import { Component } from "react";
import Proptypes from 'prop-types';
import './tasks-filter.css'

class TasksFilter extends Component {

    render() {
        const filters = ['All', 'Completed', 'Active'];
        const { filter, onToggleFilterHandler } = this.props;
        return (
            <ul className="filters">
                {filters.map((filterName) => (
                    <li key={filterName}>
                        <button
                            type="button"
                            className={filter === filterName ? 'selected' : ''}
                            onClick={(e) => onToggleFilterHandler(e.target.textContent)}
                        >
                            {filterName}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}

TasksFilter.propTypes = {
    filter: Proptypes.string.isRequired,
    onToggleFilterHandler: Proptypes.func.isRequired,
}

export default TasksFilter;