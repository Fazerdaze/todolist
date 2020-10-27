
import React, { Component } from 'react'
import fetch from 'cross-fetch';
import Header from '../components/header';
import Content from '../components/content';
import './index.css';

export default class extends Component {
  static getInitialProps({ query: { id } }) {
    return { postId: id }
  }

  
  static async getInitialProps() {
    const tasks = await fetch('http://localhost:3000/goals')
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    });

    // const isDone = await fetch('http://localhost:3000/status',
    // {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //   aaa:123
    //   })
    // })
    // .then(res => {
    //   return res.json();
    // });


    if (tasks.error) {
      throw new Error("Can't select data from the server");
    }
    return { tasks: tasks.data }
  }
  
  render() {
    const { tasks }  = this.props;

    return (
      <div className="app-wrapper">
        <Header />
        <Content tasks={tasks} />
      </div>
    )
  }
}