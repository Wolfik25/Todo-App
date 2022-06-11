import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends Component {
    constructor(props) {
        super(props);
        const { isEditorField, editingText } = this.props;
        this.state = {
            label: isEditorField ? editingText : '',
        };
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onKeyDown = (e) => {
        const { addItem, isEditorField, onEdit } = this.props;
        const { label } = this.state;

        if (e.key === 'Enter' && label.trim()) {
            if (!isEditorField) {
                addItem(label);
            } else {
                onEdit(label);
            }
            e.target.value = '';
        }
    };

    render() {
        const { isEditorField } = this.props;
        const { label } = this.state;

        let classNames;
        if (!isEditorField) {
            classNames = 'new-todo';
        } else classNames = 'edit';

        return (
            <form className="new-todo-form">
                <input className={classNames} placeholder={isEditorField ? '' : 'Task'} autoFocus onChange={this.onLabelChange}
                    onKeyDown={this.onKeyDown}
                    label={label} />
                <input className="new-todo-form__timer" placeholder="Min" autoFocus />
                <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
            </form>
        /* <input
                className={classNames}
                placeholder={isEditorField ? '' : 'Task'}
                autoFocus
                onChange={this.onLabelChange}
                onKeyDown={this.onKeyDown}
                label={label}
            /> */
        );
    }
}

NewTaskForm.defaultProps = {
    isEditorField: false,
    editingText: '',
    onAddNewHandler: () => { },
    onEditTaskHanlder: () => { },
};

NewTaskForm.propTypes = {
    isEditorField: PropTypes.bool,
    editingText: PropTypes.string,
    onAddNewHandler: PropTypes.func,
    onEditTaskHanlder: PropTypes.func,
};
export default NewTaskForm;
