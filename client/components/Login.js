import React from 'react';
import { connect } from 'react-redux';
import { createUserThunkCreator, getUserThunkCreator } from '../redux/userReducer';
import { Link } from 'react-router-dom';
import { authenticateThunkCreator } from '../redux/auth';
import Header from './Header';

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
        await this.props.authenticate(this.state.email, this.state.password, this.state.userAction, this.state.firstName, this.state.lastName);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render(){
        return (
            <div>
                <Header />
                <div className="home">
                    {this.state.userAction === null ? (
                    <div>
                        <h1>Welcome to the multi-player Spelling Bee! Either login or sign up to continue</h1>
                        <button onClick={()=>this.onChoose('login')}>Login</button>
                        {this.props.path === "/games" ? (this.onChoose('login')) : (null)}
                        <button onClick={() => this.onChoose('signup')}>Sign Up</button>
                     </div>) : (

                        <form id="userLogin" className="userLogin" onSubmit={this.handleSubmit}>
                        {this.state.userAction === "signup" ? (
                            <div className="userLogin">
                                <h1>Sign Up</h1>
                                <input placeholder="First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                                <input placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                            </div>
                        ) : (<h1>Login</h1>)}
                       <input placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                       <input placeholder="Password" type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                        <button type="submit">{this.state.userAction === 'signup' ? ('Sign Up') : ('Login')}</button>
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
  
  const mapDispatch = (dispatch, {history}) => {
    return {
      createUser: (user) => dispatch(createUserThunkCreator(user)),
      getUser: (email) => dispatch(getUserThunkCreator(email)),
      authenticate: (email, password, formName, firstName, lastName) => dispatch(authenticateThunkCreator(email, password, formName, firstName, lastName, history))
    };
  };


export default connect(mapState, mapDispatch)(Login);