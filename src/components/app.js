import { Component } from 'react';
import NewTaskForm from './new-task-form';
import TaskList from './task-list';
import Footer from './footer';

class App extends Component {

    maxId = 10;

    state = {
        todoData: [
            this.createTodoItem('Completed task'),
            this.createTodoItem('Editing task'),
            this.createTodoItem('Active task')
        ],
        filter: 'All'
    };

    createTodoItem(label) {
        return {
            label,
            done: false,
            id: this.maxId++,
            time: new Date()
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            }
        })

    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const oldItem = todoData[idx];
            const newItem = {
                ...oldItem,
                done: !oldItem.done
            };

            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    }

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
        this.setState({ todoData: todoData.filter((task) => !task.done) })
    }

    render() {
        const { todoData, filter } = this.state;
        const tasks = this.getTasksByFilter();

        const doneCount = todoData
            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addItem={this.addItem} />
                </header>
                <section className="main">
                    <TaskList tasks={tasks}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone} />
                    <Footer todoCount={todoCount}
                        filter={filter}
                        onClearCompleted={this.onClearCompleted}
                        onToggleFilterHandler={this.onToggleFilter} />
                </section>
            </section>
        );
    }
}

export default App;