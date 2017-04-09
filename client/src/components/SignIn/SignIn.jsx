import React from 'react'

import { Link } from 'react-router'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'

import Logo from '../../atoms/Logo'

export default class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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
        this.onSignIn = this.onSignIn.bind(this)
    }

    isValid() {
        let { email, password, loading } = this.state

        return this.hasValueAndNoError(email) &&
            this.hasValueAndNoError(password) &&
            !loading
    }

    hasValueAndNoError(formValue) {
        return typeof formValue !== 'undefined' && formValue.value !== '' && formValue.value !== null
            && (typeof formValue.error === 'undefined' || formValue.error === null)
    }

    onSignIn() {
        let { classes, sheet, signIn, router } = this.props,
            { password, email } = this.state,
            self = this

        self.setState({ loading: true })
        signIn(email.value, password.value)
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
            { password, email, loading } = this.state,
            self = this

        var loadingSpinner = <CircularProgress
            size={28}
            style={{
                top: '4px'
            }}
        />

        return <Paper className={classes.signin} zDepth={2}>
          <Logo />
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
            label={loading ? loadingSpinner : "Sign In"}
            primary={true}
            fullWidth={true}
            disabled={!this.isValid()}
            onTouchTap={this.onSignIn}
          />
          <Link to='/signup'>Need a new account? Sign up here.</Link>
        </Paper>
    }
}
