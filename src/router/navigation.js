import React from 'react';
import {Router, Scene, } from 'react-native-router-flux';

import FirstScreen from '../screen/FirstScreen'
import SecondScreen from '../screen/SecondScreen'

class Navigation extends React.Component {
   render() {
      return (
         <Router>
            <Scene key="root">
               <Scene key="first" component={FirstScreen} hideNavBar initial/>
               <Scene key="second" component={SecondScreen} hideNavBar/>
            </Scene>
         </Router>
      )
   }
}

export default Navigation;