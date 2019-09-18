import React, { Component } from 'react'

import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebease.utils'

class SignUp extends Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword} = this.state;

    if(password !== confirmPassword) {
      alert('password dont match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, {displayName});

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({[name]: value});
  }
  
  render() {
    return (
      <div className='sign-up'>
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit} className="sign-up-form">
          <FormInput
            type='text'
            name='displayName'
            handleChange={this.handleChange}
            value={this.state.displayName}
            label='Display Name'
            required
          />

          <FormInput
            type='email'
            name='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />

          <FormInput
            type='password'
            name='password'
            handleChange={this.handleChange}
            value={this.state.password}
            label='password'
            required
          />

          <FormInput
            type='password'
            name='confirmPassword'
            handleChange={this.handleChange}
            value={this.state.confirmPassword}
            label='confirm password'
            required
          />       

          <CustomButton type='submit'>register</CustomButton>                       
        </form>
      </div>
    )
  }
}

export default SignUp
