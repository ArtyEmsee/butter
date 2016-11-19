import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { store } from './reducers/main'
import { Provider } from 'react-redux'
import App from './components/App'
import CardsPage from './components/CardsPage'
import RewardsPage from './components/RewardsPage'
import Amazon from './components/Amazon'
require('./css/sidebar.css')
require('./css/creditCardsPage.css')
require('./css/amazon.css')


render(
  <Provider store={ store } >
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={CardsPage}/>
          <Route path="/rewards" component={RewardsPage} />
          <Route path='/amazon' component={Amazon}/>
        </Route>
      </Router>
    </Provider>,
  document.getElementById('app')
)

module.hot.accept()

