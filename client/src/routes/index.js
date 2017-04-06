import DefaultLayout from '../layouts/DefaultLayout'

import LandingPage from '../components/LandingPage'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Track from '../components/Track'

import { requiresAuthentication } from './routeChecks'

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
    }
  ]
})

export default { appRoutes }
