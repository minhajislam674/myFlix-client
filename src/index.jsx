import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";   

import { legacy_createStore as createStore  } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from "./reducers/reducers";

import MainView  from "./components/main-view/main-view";


// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const myFlixStore = createStore(moviesApp, devToolsEnhancer({
  hostname: "localhost",
  port: 1234,
  realtime: true
}));

// Main app component
class MyFlixApplication extends React.Component {
    render() {
      return (
        <Provider store={myFlixStore}> 
          <Container>
            <MainView />
          </Container>
        </Provider>
      );
    }
  }

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);