import React, { Component } from 'react';
import './App.css';
import { Input } from './input';

export default class App extends Component {
  constructor(props)  {
    super(props);

    this.state = {


    };
  }

  render = () => {
    return (
      <div>
        <h1>Log in</h1>
        <p>Type in your email and password</p>
        <div className="field">
          <form>
            <label>
              Email address
              <input
              type='email'
              name='email'
              />
            </label>

            <label>
              Password
              <input
              type='password'
              name='password'
              />
            </label>
          </form>

          <Input 
            active={true}
            label='Test'
          />
        </div>
      </div>
    )

  }


}
