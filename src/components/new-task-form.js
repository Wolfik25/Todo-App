import { Component } from "react";


class NewTaskForm extends Component {
    state = {
    label: ''
}

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        }) 
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.addItem(this.state.label);
            this.setState({
                label: ''
            });
        }
    };

    render() {
        return (
            <input className="new-todo"
                placeholder="What needs to be done?" autoFocus
                onChange={this.onLabelChange}
                onKeyDown={this.onKeyDown}
                value={ this.state.label} />
        )
    }
}

export default NewTaskForm;