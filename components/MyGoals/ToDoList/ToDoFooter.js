import React, { Component } from 'react';
import './ToDoList.module.css'

class ToDoFooter extends Component {

handleFilterChanged(e){
    this.props.onFilterChanged(e.currentTarget.dataset.value);
}


    render() {
        let { goals,filter,onClearCompleted} = this.props;
        return (
            <div className="footer">
                <div>
                <span>{this.props.goals.filter((g) => !g.isDone).length} items left</span>
                </div>
                <div className="button">
                    <button className={filter == 'all'? "button_selected" : ''} data-value="all"
                    onClick={this.handleFilterChanged.bind(this)}>All</button>
                    <button className={filter == 'active'? "button_selected" : ''} data-value="active"
                    onClick={this.handleFilterChanged.bind(this)}>Active</button>
                    <button className={filter == 'completed'? "button_selected" : ''} data-value="completed"
                    onClick={this.handleFilterChanged.bind(this)}>Completed</button>
                </div>
            <div><span className="ClearCompleted" onClick={onClearCompleted}>Clear Components</span></div>
            </div>);
    }
};
export default ToDoFooter;
