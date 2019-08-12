import React, { Component } from 'react';
import Form from '../Form/Form';
// onRouteChange
class SignIn extends Component {
  state = {
    signInEmail: '',
    signInPassword: ''
  };

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    // fetch('https://desolate-depths-14393.herokuapp.com/signin', {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          alert(user);
        }
      });
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
              <Form label='Email' type='email' onChange={this.onEmailChange} />
              <Form
                label='Password'
                type='password'
                onChange={this.onPasswordChange}
              />
            </fieldset>
            <div style={{ marginTop: "10px" }}>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign in'
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className='lh-copy mt3'>
              <p
                href='#0'
                className='f6 link dim black db pointer'
                onClick={() => onRouteChange('register')}
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
