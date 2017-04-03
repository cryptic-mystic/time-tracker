import { connect } from 'react-redux'
import { createUser, syncUser } from '../../store/user/actions'

import LandingPage from './LandingPage'

export default connect((state) => {
    return {
        user: state.user
    }
}, { createUser, syncUser })(LandingPage)
