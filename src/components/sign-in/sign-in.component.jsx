import React, { Component } from 'react'

import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {signInWithGoogle, auth} from '../../firebase/firebease.utils'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: ''})
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({[name]: value})
  }
  render() {
    return (
      <div className='sign-in'>
        <h2>i already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput type="email" value={this.state.email} name='email'
            handleChange={this.handleChange} label="email" />
          <FormInput type="password" value={this.state.password} name='password'
            handleChange={this.handleChange} label="password" />
          <div className="buttons">
            <CustomButton type="submit">submit</CustomButton>
            <CustomButton isGoogleSignIn onClick={signInWithGoogle}>sign in with g</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn
