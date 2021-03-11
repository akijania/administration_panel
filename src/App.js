import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import  MainLayout  from './components/layout/MainLayout/MainLayout';
import  {UserList}  from './components/views/UserList/UserList';
import  {AddUser}  from './components/views/AddUser/AddUser';
import  {EditUser}  from './components/views/EditUser/EditUser';
import  NotFound  from './components/views/PageNotFound/PageNotFound';
import './styles/global.scss';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route exact path='/' component={UserList} />
              <Route exact path='/form' component={AddUser} />
              <Route exact path='/form/:id' component={EditUser} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
