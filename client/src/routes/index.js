import DefaultLayout from '../layouts/DefaultLayout'

import LandingPage from '../components/LandingPage'

export const appRoutes = () => ({
  path: '/',
  component: DefaultLayout,
  indexRoute: {
    component: LandingPage
  },
  childRoutes: []
})

export default { appRoutes }
