import { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

function NewTaskForm({ isEditorField, editingText, addItem, onEdit }) {

    const [label, setLabel] = useState(isEditorField ? editingText : '');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');    

    const onLabelChange = (e) => {
        setLabel(e.target.value);
    };

    const onKeyDown = (e) => {

        if (e.key === 'Enter' && label.trim()) {
            if (!isEditorField) {
                addItem(label, min, sec);
            } else {
                onEdit(label);
            }
            e.target.value = '';
            setMin('');
            setSec('');
        }
    };

    const onChangeTime = (e) => {
        const { value, name } = e.target;

        if (value.trim() && +value <= 59 && +value >= 0 && !Number.isNaN(value)) {
            if (name === 'sec') {
                setSec(value);
            }
            if (name === 'min') {
                setMin(value);
            }
        }
        if (!value.trim()) { 
            setSec('');
            setMin('');
        }
    };

    let classNames;
    if (!isEditorField) {
        classNames = 'new-todo';
    } else classNames = 'edit';

    return (
        <>
            {(isEditorField)
                ? <input className={classNames} autoFocus onChange={onLabelChange} onKeyDown={onKeyDown} label={label} />
                : <form className="new-todo-form">
                    <input className={classNames} placeholder='Task' autoFocus name='label' onChange={onLabelChange} onKeyDown={onKeyDown} label={label} />
                    <input className="new-todo-form__timer" placeholder="Min" name='min' value={min} autoFocus onChange={onChangeTime} />
                    <input className="new-todo-form__timer" placeholder="Sec" name='sec' value={sec} autoFocus onChange={onChangeTime} />
                </form>
            }
        </>
    );
    
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
