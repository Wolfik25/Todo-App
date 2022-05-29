import PropTypes from 'prop-types';

import Task from '../Task/task';
import NewTaskForm from '../NewTaskForm/new-task-form';
import './task-list.css';

function TaskList({ tasks, onDeleted, onToggleDone, onEditMode, onEdit }) {
  const elements = tasks.map((el) => {
    const { id, ...elProps } = el;
    return (
      <Task
        {...elProps}
        key={id}
        task={el}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEditMode={() => onEditMode(id)}
      >
        <NewTaskForm isEditorField editingText={el.label} onEdit={onEdit} />
      </Task>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propType = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      isEditing: PropTypes.bool.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditMode: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskList;
