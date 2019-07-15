import React from 'react';
import queryData from './queryData';

class RootContainer extends React.Component {
	componentDidMount() {
		const {
			entity: { value },
			serviceUrl
		} = this.props;
		queryData(value, serviceUrl)
			.then(res => {
				const { atlasExpression } = res;
				this.setState({
					chartData: atlasExpression,
					loading: false
				});
			})
			.catch(error => this.setState({ error, loading: false }));
	}

	render() {
		return (
			<div className="rootContainer">
				<h1>Your Data Viz Here</h1>
			</div>
		);
	}
}

export default RootContainer;
