import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import { Container, } from 'semantic-ui-react'
import Navbar from './components/Navbar';
import Departments from './components/Departments';
import NoMatch from './components/NoMatch';
import Department from './components/Department'
import Product from './components/Product'

const App = () => (
  <Fragment>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/Departments' component={Departments} />
        <Route exact path='/Departments/:id' component={Department} />
        <Route exact path='/Departments/:department_id/products/:id' component={Product} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App
