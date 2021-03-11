import React, { Component } from 'react';
import { Redirect, Route , Switch } from 'react-router-dom'
import Home from '../../pages/Home';
import Manage from '../../pages/Manage';
import Series from '../../pages/Series';
import Wanted from '../../pages/Wanted';
import Calander from '../../pages/Calander';

class Routing extends Component {
    render() {
      return (
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/manage/paths" component={() => <Manage state='paths' />} />
              <Route exact path="/manage/statuses" component={() => <Manage state='statuses' />} />
              <Route exact path="/manage/scanner" component={() => <Manage state='scanner' />} />
              <Route exact path="/series" component={Series} />
              <Route exact path="/wanted" component={Wanted} />
              <Route exact path="/calander" component={Calander} />
              <Redirect to="/" />
          </Switch>
      );
    }
  }

  export default Routing;