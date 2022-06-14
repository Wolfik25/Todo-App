import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends Component {
    constructor(props) {
        super(props);
        const { isEditorField, editingText } = this.props;
        this.state = {
            label: isEditorField ? editingText : '',
            min: '',
            sec: '',
        };
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onKeyDown = (e) => {
        const { addItem, isEditorField, onEdit } = this.props;
        const { label, min, sec } = this.state;

        if (e.key === 'Enter' && label.trim()) {
            if (!isEditorField) {
                addItem(label, min, sec);
            } else {
                onEdit(label);
            }
            e.target.value = '';
            this.setState({ min: '', sec: '' });
        }
    };

    onChangeTime = (e) => {
        const { value, name } = e.target;

        if (value.trim() && +value <= 59 && +value >= 0 && !Number.isNaN(value)) {
            this.setState({
                [name]: value,
            });
        }
        if (!value.trim()) this.setState({ [name]: '' });
    };

    render() {
        const { isEditorField } = this.props;
        const { label, min, sec } = this.state;

        let classNames;
        if (!isEditorField) {
            classNames = 'new-todo';
        } else classNames = 'edit';

        return (
            <>
                {(isEditorField)
                    ? <input className={classNames} autoFocus onChange={this.onLabelChange} onKeyDown={this.onKeyDown} label={label}/>
                    : <form className="new-todo-form">
                        <input className={classNames} placeholder='Task' autoFocus name='label' onChange={this.onLabelChange} onKeyDown={this.onKeyDown} label={label} />
                        <input className="new-todo-form__timer" placeholder="Min" name='min' value={min} autoFocus onChange={this.onChangeTime} />
                        <input className="new-todo-form__timer" placeholder="Sec" name='sec' value={sec} autoFocus onChange={this.onChangeTime} />
                    </form>
                }
            </>
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
