import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import query from '../queries/currentUser';
import mutation from '../mutations/Logout';
import { Link } from 'react-router';

class Header extends Component {
	onLogoutClick() {
		this.props.logout().then(() => this.props.data.refetch());
	}
	renderButtons() {
		const { loading, user } = this.props.data;

		if (loading) {
			return <div />;
		}

		if (user) {
			return (
				<li>
					<a onClick={this.onLogoutClick.bind(this)}>Logout</a>
				</li>
			);
		} else {
			return (
				<div>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</div>
			);
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo left">
						Home
					</Link>
					<ul className="right">
						{this.renderButtons()}
					</ul>
				</div>
			</nav>
		);
	}
}

export default compose(graphql(query), graphql(mutation, { name: 'logout' }))(
	Header
);
