import React from 'react';
import queryData from './queryData';
import getChartData from './chartData';
import ExpressionChart from './chart';
import Loading from './loading';

class RootContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			loading: true,
			error: false
		};
	}

	componentDidMount() {
		const {
			entity: { value },
			serviceUrl,
			testing
		} = this.props;

		// no need to fetch and show anything if in testing mode
		if (testing) return;

		queryData(value, serviceUrl)
			.then(res => {
				const { atlasExpression } = res;
				this.setState({
					chartData: getChartData(atlasExpression),
					loading: false
				});
			})
			.catch(error => this.setState({ error, loading: false }));
	}

	render() {
		if (this.state.loading)
			return (
				<div className="rootContainer">
					<Loading />
				</div>
			);

		return (
			<div className="rootContainer">
				{this.state.chartData && !this.state.error ? (
					<ExpressionChart chartData={this.state.chartData} />
				) : (
					<span className="error">{this.state.error}</span>
				)}
			</div>
		);
	}
}

export default RootContainer;
