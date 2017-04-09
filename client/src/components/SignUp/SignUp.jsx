import React from 'react'

import { Link } from 'react-router'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'

import Logo from '../../atoms/Logo'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: {
                value: '',
                error: null
            },
            email: {
                value: '',
                error: null
            },
            password: {
                value: '',
                error: null
            },
            loading: false
        }

        this.isValid = this.isValid.bind(this)
        this.hasValueAndNoError = this.hasValueAndNoError.bind(this)
        this.onSignUp = this.onSignUp.bind(this)
    }

    isValid() {
        let { username, email, password, loading } = this.state

        return this.hasValueAndNoError(username) &&
            this.hasValueAndNoError(email) &&
            this.hasValueAndNoError(password) &&
            !loading
    }

    hasValueAndNoError(formValue) {
        return typeof formValue !== 'undefined' && formValue.value !== '' && formValue.value !== null
            && (typeof formValue.error === 'undefined' || formValue.error === null)
    }

    onSignUp() {
        let { classes, sheet, signUp, router } = this.props,
            { username, password, email } = this.state,
            self = this

        self.setState({ loading: true })
        signUp(username.value, email.value, password.value)
            .then(function() {
                router.push('/track')
            })
            .catch(function(error) {
                self.setState({
                    loading: false,
                    [`${error.field}`]: {
                        value: self.state[`${error.field}`].value,
                        error: error.message
                    }
                })
            })
    }

    render() {
        let { classes, sheet } = this.props,
            { username, password, email, loading } = this.state,
            self = this

        var loadingSpinner = <CircularProgress
            size={28}
            style={{
                top: '4px'
            }}
        />

        return <Paper className={classes.signup} zDepth={2}>
          <Logo />
          <TextField
            floatingLabelText="Username"
            fullWidth={true}
            value={username.value}
            errorText={username.error}
            onChange={(event) => self.setState({ username: { value: event.target.value } })}
          />
          <TextField
            floatingLabelText="Email"
            fullWidth={true}
            value={email.value}
            errorText={email.error}
            onChange={(event) => self.setState({ email: { value: event.target.value } })}
          />
          <TextField
            floatingLabelText="Password"
            fullWidth={true}
            value={password.value}
            errorText={password.error}
            onChange={(event) => self.setState({ password: { value: event.target.value } })}
            type="password"
          />
          <RaisedButton className={classes.button}
            label={loading ? loadingSpinner : "Sign Up"}
            primary={true}
            fullWidth={true}
            disabled={!this.isValid()}
            onTouchTap={this.onSignUp}
          />
          <Link to='/signin'>Already have an account? Sign in here.</Link>
        </Paper>
    }
}
