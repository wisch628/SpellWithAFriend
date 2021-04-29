import React from 'react';
import { connect } from 'react-redux';
import { createUserThunkCreator, getUserThunkCreator } from '../redux/userReducer';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            userAction: null,
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.onChoose = this.onChoose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    onChoose(value){
        this.setState({
            userAction: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.userAction === "Login") {
            this.props.getUser(this.state.email);
        } else if (this.state.userAction === "Sign Up") {
            this.props.createUser(this.state)
        }
        this.props.onDone()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        console.log('props', this.props);
        console.log('state', this.state);
        return (
            <div>
                <div>
                    {this.state.userAction === null ? (
                    <div>
                        <button onClick={()=>this.onChoose('Login')}>Login</button>
                        <button onClick={() => this.onChoose('Sign Up')}>Sign Up</button>
                        <button onClick={this.handleSubmit}>Play as a Guest</button>
                     </div>) : (

                        <form id="userLogin" onSubmit={this.handleSubmit}>
                        {this.state.userAction === "Sign Up" ? (
                            <div>
                                <h1>Sign Up</h1>
                                <input placeholder="First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                                <input placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                            </div>
                        ) : (<h1>Log In</h1>)}
                       <input placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                       <input placeholder="Password" type="text" value={this.state.password} name="password" onChange={this.handleChange} />
                        <button type="submit">{this.state.userAction}</button>
                    </form>
                        )

                     }
                     
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      user: state.user
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      createUser: (user) => dispatch(createUserThunkCreator(user)),
      getUser: (email) => dispatch(getUserThunkCreator(email))
    };
  };

export default connect(mapState, mapDispatch)(Login);