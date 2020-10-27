import React, { Component } from 'react';
import './ToDoList.module.css';

class ToDoGoalCreator extends Component {

    constructor(props) {
        super();


    }

    createNewGoal(e) {


        if (e.key === 'Enter') {
               
            const newGoal=
            {
                text: e.currentTarget.value, 
            };

  
    // if(newGoal.text.length < 5){
    //     alert('ERROR TEXT LENGTH')
    // }  
    // else{
        this.props.onCreate(newGoal);
    // }  
 
    e.currentTarget.value = '';

    }
    }

    render() {
        return (
            <div className="goalsFormCreator">
                <input placeholder="Add to-do..." onKeyPress={this.createNewGoal.bind(this)}  maxLength="40" />
            </div>);
    }
};
export default ToDoGoalCreator;
