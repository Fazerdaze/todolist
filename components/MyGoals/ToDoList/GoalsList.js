import React, { Component } from 'react';
import './ToDoList.module.css';
import Goal from './Goal/Goal';
import ToDo from '../ToDo';

class GoalsList extends Component {
   
   deleteGoal(goalId){

}

render() {
    return (
        
        <div className="goals">
        {
        this.props.goals.map((goal, index) => {
        return <Goal goalid={goal.id} goal={goal}
        updateCallback={this.props.onUpdate.bind(this)} 
        deleteCallback={this.props.onDelete.bind(this)} key={goal.id} />
           })
        }
        </div>);
        }
};
export default GoalsList;