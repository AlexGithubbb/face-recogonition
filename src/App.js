import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecgonition from './components/FaceRecgonition/FaceRecgonition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ca84e148be6e4a74ac5de36d793d3b28'
});

const particleOption = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
};

class App extends Component {
  state = {
    input: '',
    imgUrl: '',
    box: {},
    // showSignIn: true
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  };

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    });
  };
  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log);
  }

  calculateFaceLocation = data => {
    console.log(data);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - data.right_col * width,
      bottomRow: height - data.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  inputChangeHandler = e => {
    this.setState({ input: e.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // URL
        // "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        this.state.input
      )
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-type': 'Application/json' },
            body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(entries => {
          // this.setState({
          //   user: {
          //     entries: entries
          //   }
          // })
          this.setState(
            Object.assign(this.state.user, {entries: entries}))
        })
      }
        const data =
          response.outputs[0].data.regions[0].region_info.bounding_box;
        this.displayFaceBox(this.calculateFaceLocation(data));
      })
      .catch(err => console.log('oooppps, error!'));
  };

  onRouteChange = route => {
    if (route === 'signin') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };
  render() {
    const { input, isSignedIn, imgUrl, box, route } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particleOption} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              input={input}
              onInputChange={this.inputChangeHandler}
              onButtonClick={this.onPictureSubmit}
            />
            <FaceRecgonition box={box} imageUrl={imgUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange}
          loadUser ={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
