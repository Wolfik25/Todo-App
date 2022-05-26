import { Component } from "react";

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

export default TasksFilter;