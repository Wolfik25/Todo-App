import { Component } from 'react';

import NewTaskForm from '../NewTaskForm/new-task-form';
import TaskList from '../TaskList/task-list';
import Footer from '../Footer/footer';
import './app.css';

class App extends Component {
    maxId = 10;

    state = {
        todoData: [
            this.createTodoItem('Completed task'),
            this.createTodoItem('Editing task'),
            this.createTodoItem('Active task'),
        ],
        filter: 'All',
    };

    createTodoItem(label, min, sec) {
        return {
            label,
            done: false,
            id: this.maxId++,
            time: new Date(),
            isEditing: false,
            timerMin: min || '0',
            timerSec: sec || '0',
        };
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return {
                todoData: newArray,
            };
        });
    };

    addItem = (text, min, sec) => {
        const newItem = this.createTodoItem(text, min, sec);

        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr,
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const oldItem = todoData[idx];
            const newItem = {
                ...oldItem,
                done: !oldItem.done,
            };

            const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

            return {
                todoData: newArray,
            };
        });
    };

    getTasksByFilter() {
        const { todoData: tasks } = this.state;
        const { filter } = this.state;

        switch (filter) {
            case 'Active':
                return tasks.filter((task) => !task.done);
            case 'Completed':
                return tasks.filter((task) => task.done);
            default:
                return tasks;
        }
    }

    onToggleFilter = (filter) => {
        this.setState({
            filter,
        });
    };

    onClearCompleted = () => {
        const { todoData } = this.state;
        this.setState({ todoData: todoData.filter((task) => !task.done) });
    };

    onEditMode = (id) => {
        const { todoData } = this.state;
        const newArray = todoData.map((task) => {
            if (task.done) return task;
            if (task.id === id) return { ...task, isEditing: true };
            if (task.isEditing) return { ...task, isEditing: false };
            return task;
        });

        this.setState({
            todoData: newArray,
        });
    };

    onEdit = (text) => {
        const { todoData } = this.state;
        const newArray = todoData.map((task) => {
            if (task.isEditing) return { ...task, isEditing: false, label: text};
            return task;
        });

        this.setState({
            todoData: newArray,
        });
    };

    render() {
        const { todoData, filter } = this.state;
        const tasks = this.getTasksByFilter();

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addItem={this.addItem} />
                </header>
                <section className="main">
                    <TaskList
                        tasks={tasks}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                        onEditMode={this.onEditMode}
                        onEdit={this.onEdit}
                    />
                    <Footer
                        todoCount={todoCount}
                        filter={filter}
                        onClearCompleted={this.onClearCompleted}
                        onToggleFilterHandler={this.onToggleFilter}
                    />
                </section>
            </section>
        );
    }
}

export default App;
