import React, { Component } from 'react';
import './MyGoals.module.css';
import ToDoFooter from './ToDoList/ToDoFooter';
import ToDoGoalCreator from './ToDoList/ToDoGoalCreator';
import GoalsList from './ToDoList/GoalsList';
import { post, del } from '../../libs/ajax';

class MyGoals extends Component {

    constructor(props) {
        super();
        console.log(props.tasks)
        this.state = {
            goals: props.tasks,
            filter: "all"  
                
        };   
        this.updateGoal=this.updateGoal.bind(this);
        this.putGoalToState=this.putGoalToState.bind(this);
        this.deleteGoal=this.deleteGoal.bind(this);
        this.changeFilter=this.changeFilter.bind(this);
        this.clearCompleted=this.clearCompleted.bind(this)
        

    }

    clearCompleted(){
        // let nDone ={...this.state.goals};

        // fetch('http://localhost:3000/goalisdone',
        //  {
        //  method: 'DELETE',
        //  headers: {
        //      'Accept': 'application/json',
        //      'Content-Type': 'application/json'
        //  },
        //  body: JSON.stringify({
        // nDone
        //  })
        //  })
        // .then(res => {return res.json();})
        // .then(o => {
        //     console.log('lig', o);
        //     const newGoalsList = this.state.goals.filter((g) => {
        //         g => !o.data.isDone
        //     });
             
        // this.setState({goals: newGoalsList});
        // });
        this.setState({
            goals: this.state.goals.filter(g => !g.isDone)
        });

    }

    changeFilter(filterValue){
        this.setState({filter:filterValue})
    }

    putGoalToState(goal) {

        post('/posts', { goal })
        .then(o => {
            if(!o.error && o.data != null){
                this.state.goals.push({
                    id: o.data.id,
                    text: goal.text,
                    isDone: o.data.isDone
                })
                this.setState({goals: [...this.state.goals]});
            }else if (o.hasOwnProperty('message')) {
                alert(o.message);
            } else {
                alert('There is a problem with request!');
            }
        });
    }

    deleteGoal(goalID) {
        del('/goalid', {goalID}).then(o => {
            console.log('lig', o);
            const newGoalsList = this.state.goals.filter((g) => {
                return g.id !== o.data.id;
            });
            
            this.setState({goals: newGoalsList});
        });
    }

    updateGoal(goal){
        post('/status', { goal })
        .then(o=> {
            console.log('log', o);
            this.state.goals.forEach((g)=>{
                if(g.id === o.data.id) {
                    g.isDone = o.data.isDone;
                } 
            });
            this.setState({goals: this.state.goals});
        });
    }

    render() {
        let { goals,filter} = this.state;

        let filteredGoals =[];
        if (filter === 'all') filteredGoals= goals;
        if (filter === 'active') filteredGoals = goals.filter(g =>!g.isDone);
        if (filter === 'completed') filteredGoals = goals.filter(g =>g.isDone);
        

        return (
            <div className="goalsForm">
                <ToDoGoalCreator onCreate={this.putGoalToState} />
                <GoalsList goals={filteredGoals} 
                onUpdate={this.updateGoal}
                onDelete={this.deleteGoal}
                />
                <ToDoFooter goals={goals} 
                filter={filter}
                onFilterChanged={this.changeFilter}
                onClearCompleted={this.clearCompleted}
                 />
           
            </div>);
    }
};
export default MyGoals;
