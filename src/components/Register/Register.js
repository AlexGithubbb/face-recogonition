import React, { Component } from 'react';
import Form from '../Form/Form';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  };
  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        } else {
          alert('wrong input');
        }
      });
  }

  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Register</legend>
              <Form label='Name' type='name' onChange={this.onNameChange} />
              <Form label='Email' type='email' onChange={this.onEmailChange} />
              <Form
                label='Password'
                type='password'
                onChange={this.onPasswordChange}
              />
            </fieldset>
            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign in'
                onClick={this.onSubmitSignIn}
              />
            </div>
            {/* <div className='lh-copy mt3'>
            <a href='#0' className='f6 link dim black db'>
              Register
            </a>
          </div> */}
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
