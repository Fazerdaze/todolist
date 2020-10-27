import React, { Component } from 'react';
import './Goal.module.css'
import GoalsList from '../GoalsList';

class Goal extends Component {

    constructor(props) {
        super();

        this.parentDeleteCallback=props.deleteCallback;
        this.parentUpdateCallback=props.updateCallback;
        this.toggleGoalStatus=this.toggleGoalStatus.bind(this);
        this.deleteGoal=this.deleteGoal.bind(this)

    }

    deleteGoal(e) {
        let goal ={...this.props.goal};
        if (!goal.isDone ){
            alert("Задача не выполнена")
        }
        else{
        let r = confirm("Вы готовы удалить задачу?");
        if (r == true) {
            this.parentDeleteCallback(this.props.goal)
        } else {
        return 0;
}  } 
    }

    toggleGoalStatus(e) {
        let goal ={...this.props.goal};
        goal.isDone= !goal.isDone, 
           
        this.parentUpdateCallback(goal);
    }

    render() {
        return (
            <div className="goal">

                <div className={ this.props.goal.isDone ? "goal_done" : "goal"} >
                    <input type="checkbox" defaultChecked={this.props.goal.isDone} onClick={this.toggleGoalStatus} />
                    {this.props.goal.text}
                    <span className="delete"
                        onClick={this.deleteGoal}>x</span>
                </div>
            </div>
            
        );
    }

}

export default Goal;
