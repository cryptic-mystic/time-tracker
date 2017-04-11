import DefaultLayout from '../layouts/DefaultLayout'

import LandingPage from '../components/LandingPage'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Track from '../components/Track'
import Profile from '../components/Profile'
import UsersManager from '../components/UsersManager'

import { requiresAuthentication, requiresManager } from './routeChecks'

export const appRoutes = (store) => ({
  path: '/',
  component: DefaultLayout,
  indexRoute: {
    component: LandingPage
  },
  childRoutes: [
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    {
      path: '/track',
      component: Track,
      onEnter: requiresAuthentication(store)
    },
    {
      path: '/profile',
      component: Profile,
      onEnter: requiresAuthentication(store)
    },
    {
      path: '/users',
      component: UsersManager,
      onEnter: requiresManager(store)
    }
  ]
})

export default { appRoutes }
