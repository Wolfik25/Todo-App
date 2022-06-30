import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm/new-task-form';
import TaskList from '../TaskList/task-list';
import Footer from '../Footer/footer';
import './app.css';

function App () {

    const createTodoItem = (label, min, sec) => {
        return {
            label,
            done: false,
            id: uuidv4(),
            time: new Date(),
            isEditing: false,
            timerMin: min || '0',
            timerSec: sec || '0',
        };
    };

    const [todoData, setTodoData] = useState([createTodoItem('Completed task'), createTodoItem('Editing task'), createTodoItem('Active task')]);
    const [filter, setFilter] = useState('All');

    const deleteItem = (id) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

        setTodoData(newArray);
    };

    const addItem = (text, min, sec) => {
        const newItem = createTodoItem(text, min, sec);
        setTodoData(todoData.concat(newItem));
    };

    const onToggleDone = (id) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {
            ...oldItem,
            done: !oldItem.done,
        };
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        setTodoData(newArray);
    };
    
    const getTasksByFilter = () => {
        switch (filter) {
            case 'Active':
                return todoData.filter((task) => !task.done);
            case 'Completed':
                return todoData.filter((task) => task.done);
            default:
                return todoData;
        }
    };
    const tasks = getTasksByFilter();
    const onToggleFilter = (filter) => {
        setFilter(filter);
    };

    const onClearCompleted = () => {
        setTodoData(todoData.filter((task) => !task.done));
    };

    const onEditMode = (id) => {
        const newArray = todoData.map((task) => {
            if (task.done) return task;
            if (task.id === id) return { ...task, isEditing: true };
            if (task.isEditing) return { ...task, isEditing: false };
            return task;
        });

        setTodoData(newArray);
    };

    const onEdit = (text) => {
        const newArray = todoData.map((task) => {
            if (task.isEditing) return { ...task, isEditing: false, label: text};
            return task;
        });

        setTodoData(newArray);
    };

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm addItem={addItem} />
            </header>
            <section className="main">
                <TaskList
                    tasks={tasks}
                    onDeleted={deleteItem}
                    onToggleDone={onToggleDone}
                    onEditMode={onEditMode}
                    onEdit={onEdit}
                />
                <Footer
                    todoCount={todoCount}
                    filter={filter}
                    onClearCompleted={onClearCompleted}
                    onToggleFilterHandler={onToggleFilter}
                />
            </section>
        </section>
    );
    
}

export default App;
