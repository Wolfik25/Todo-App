import NewTaskForm from './new-task-form';
import TaskList from './task-list';
import Footer from './footer';

const App = () => {
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className="main">
                <TaskList />
                <Footer />
            </section>
        </section>
    );
}

export default App;