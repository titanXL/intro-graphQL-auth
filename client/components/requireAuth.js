import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/currentUser';
import { hashHistory } from 'react-router';

export default WrappedComponent => {
	class RequierAuth extends React.Component {
		componentWillUpdate(nextProps) {
			if (!nextProps.data.loading && !nextProps.data.user) {
				hashHistory.push('/login');
			}
		}
		render() {
			return <WrappedComponent {...this.props} />;
		}
	}
	return graphql(query)(RequierAuth);
};
