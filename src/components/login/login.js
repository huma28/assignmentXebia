import React, { isValidElement } from 'react';
import s from './login.scss';
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import classNames from 'classnames';


import * as actionCreator from '../../store/actions/action';
import Loader from '../loader/loader';

class Login extends React.Component {

	state = {
		userName: '',
		password: '',
		error:{
			userName: '',
			password: '',
		},
		planets: [],
		loading: false,
		showerror: '',
	}

	componentDidMount() {
		// if already login then go to another page (/planets)
		if(this.props.isLogin) {
			this.props.history.push('/planets')
			return;
		}

		fetch("https://swapi.co/api/people/")
      .then(res => {
				return res.json()})
      .then(
        (result) => {
					this.setState({
						planets: result.results,
					});
					// setting all user's data in local storage (we can skip it)
					this.props.OnSetAllData(
						result.results
					);
        },
    
        (error) => {
					console.log('then error', error);
        }
			)
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		let error = {...this.state.error};
		switch(name) {
			case 'userName':
				error.userName = value.length < 5 ? 'Name must be greater than 5 character' : '';
				break;
			case 'password':
				error.password = value.length < 4 ? 'Password must be greater than 4 character' : '';
				break;
			default:
				break;
		}
		this.setState({
			[name]: value,
			error: error,
		});	
	}

	isValid(error){
		let valid = true;
		Object.values(error).forEach(
			(val) => val.length > 0 && (valid = false)
		);
		return valid;
	}

	submit = (event) => {
		event.preventDefault();
		if(this.isValid(this.state.error)) {
			const { userName, password } = this.state;
			this.setState({
				loading: true
			});
			this.state.planets.map((item) => { 
				if(item.name === userName) {
					if (item.birth_year === password) {
						this.props.OnLogin();
						this.setState({
							loading: false,
							showerror: '',
						});
						this.props.history.push('/planets')
					} else {
						this.setState({
							showerror : "Password not matched",
							loading: false,
						});
					}
				} else {
					this.setState({
						showerror : "Something went wrong",
						loading: false,
					});
				}
			});
		}
		else{
			this.setState({
				showerror : "Wrong cradential",
				loading: false,
			});
		}
	}

	render() {
		const { userName, password, showerror, error, loading } = this.state;
		return(
			<div className="container">
			  <div className="row">
					<div className={classNames('col-md-12', 'login-wrap')}>
					<h3>Login</h3>
						<form onSubmit={this.submit}>
							<div className="form-group">
								<label for="exampleInputEmail1">User name</label>
								<input type="text" value={userName}  name="userName" className="form-control" id="exampleInputEmail1" onChange={this.handleChange} />
								<small id="emailHelp" className={classNames('form-text', 'error')}>{error.userName && error.userName}</small>
							</div>
							<div className="form-group">
								<label for="exampleInputPassword1">Password</label>
								<input type="password" value={password} name="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChange} />
								<small id="emailHelp" className={classNames('form-text', 'error')}>{error.password && error.password}</small>
							</div>
							<div className="login-btn">
								<button type="submit" className="btn btn-primary">Login</button>
							</div>
							<div>
								{showerror && showerror}
							</div>
							
							{loading && <Loader width="20px" height="20px" />}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		isLogin: state.isLogin,
	}
}

const mapDispachToProps = (dispach) => {
	return{
		OnSetAllData: (data) => dispach(actionCreator.getAllUserData(data)),
		OnLogin: () => dispach(actionCreator.setLogin(true)),
	}
};
export default connect(mapStateToProps, mapDispachToProps)(Login);