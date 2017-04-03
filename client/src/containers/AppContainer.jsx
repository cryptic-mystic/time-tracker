import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
        routerKey: PropTypes.number
    }

    render () {
        const { history, routes, routerKey, store } = this.props

        return (
          <Provider store={store}>
            <Router history={history} children={routes} key={routerKey} />
          </Provider>
        )
    }
}

export default AppContainer
