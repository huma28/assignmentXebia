import React from 'react';
import s from './planetList.scss';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/action';
import Loader from '../loader/loader';
import classNames from 'classnames';

class PlanetList extends React.Component {

	state = {
		planets: [],
		loading: false,
		showError: '',
		searchedData: [],
	}

	componentDidMount() {
		//if not login then go to loign page
		if(!this.props.isLogin) {
			this.props.history.push('/login')
			return;
		}

		this.setState({
			loading: true,
		});
		fetch("https://swapi.co/api/planets/")
      .then(res => {
				return res.json()})
      .then(
        (result) => {
					this.setState({
						planets: result.results,
						searchedData: result.results,
						loading: false,
						showError: '',
					});
        },
    
        (error) => {
					this.setState({
						showError: "Something went wrong",
						loading: false,
					});
       
        }
			)
	}

	onSearch(event) {
		// here in debouncing function i am not sending function
		this.debounceFunction(event.target.value, 2000);
	}
	debounceFunction(name, delay) {
		let timer;
		let context = this;
		clearTimeout(timer);
		//here i m directly calling function from debouncing function
		timer = setTimeout(() => {this.searchItem(name)}, delay);
	}

	searchItem = (name) => {
		const { planets } = this.state;
		const items = planets.filter((data) => {
			if(name == null)
				return planets
			else if(data.name.toLowerCase().includes(name.toLowerCase())){
				return data
			}
		});
		this.setState({
			searchedData: items,
		});
	}

	logOut = () => {
		this.props.history.push('/login');
		this.props.OnLogOut();
	}

	render() {
		const { loading, showError, searchedData } = this.state;
		return(
			<div className="container">
			  <div className="row">
					<div className={classNames('col-md-12', 'logout-div')}>
						<span onClick={this.logOut}>LogOut</span>
					</div>
					<div className={classNames('col-md-12', 'list-wrap')}>
						<div class="input-group mb-3">
							<input type="text"
								onChange = {(event) => this.onSearch(event)}
								class="form-control"
								placeholder="Ex. planet"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
							/>
						</div>
					<h3>Planets</h3>
					<ul className="list">
						{searchedData.map((item, index) => <li>{item.name} - {item.population}</li>)
						}
					</ul>
					{searchedData.length <= 0 && !loading && <div className="no-data-found">No data found</div>}
					{loading && <Loader width="20px" height="20px" />}
					{showError && showError}
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
	return {
		OnLogOut: () => dispach(actionCreator.logOut()),
	}
};
export default connect(mapStateToProps, mapDispachToProps)(PlanetList);
