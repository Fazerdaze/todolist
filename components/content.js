import React from 'react';
import MyGoals from './MyGoals/ToDo';

import './content.module.css';

const Content = (props) =>{
   return(
       <div className="Content">
      <MyGoals tasks={props.tasks}/>
       </div>
   ); 
}

export default Content;