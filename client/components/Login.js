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

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.userAction === "Login") {
            await this.props.getUser(this.state.email);
            if (this.props.path === "/games") {
                this.props.redirect();
            } else {
                this.props.onDone()
            }

        } else if (this.state.userAction === "Sign Up") {
            this.props.createUser(this.state);
            this.props.onDone();
        }
        
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return (
            <div>
                <div>
                    {this.state.userAction === null ? (
                    <div>
                        <h1>If you want to save your game stats, either sign up or login as a user. Otherwise, you can continue as a guest!</h1>
                        <button onClick={()=>this.onChoose('Login')}>Login</button>
                        {this.props.path === "/games" ? (this.onChoose('Login')) : (null)}
                        <button onClick={() => this.onChoose('Sign Up')}>Sign Up</button>
                        {/* <button onClick={this.handleSubmit}>Play as a Guest</button> */}
                     </div>) : (

                        <form id="userLogin" className="userLogin" onSubmit={this.handleSubmit}>
                        {this.state.userAction === "Sign Up" ? (
                            <div className="userLogin">
                                <h1>Sign Up</h1>
                                <input placeholder="First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                                <input placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                            </div>
                        ) : (<h1>Login</h1>)}
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