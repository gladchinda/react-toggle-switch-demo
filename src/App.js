import classnames from 'classnames';
import snakeCase from 'lodash/snakeCase';
import React, { Component } from 'react';
import Switch from './components/ToggleSwitch';
import './App.css';

const ACTIVITIES = [
	'News Feeds', 'Likes and Comments', 'Live Stream', 'Upcoming Events',
	'Friend Requests', 'Nearby Friends', 'Birthdays', 'Account Sign-In'
];

class App extends Component {

	state = { enabled: false, only: [] }

	toggleNotifications = ({ enabled }) => {
		const { only } = this.state;
		this.setState({ enabled, only: enabled ? only : [] });
	}

	toggleActivityEnabled = activity => ({ enabled }) => {
		let { only } = this.state;

		if (enabled && !only.includes(activity)) {
			only.push(activity);
			return this.setState({ only });
		}

		if (!enabled && only.includes(activity)) {
			only = only.filter(item => item !== activity);
			return this.setState({ only });
		}
	}

	renderNotifiableActivities() {
		const { only } = this.state;

		return ACTIVITIES.map((activity, index) => {
			const key = snakeCase(activity);
			const enabled = only.includes(key);

			const activityClasses = classnames(
				'small mb-0 pl-3',
				enabled ? 'text-dark' : 'text-secondary'
			);

			return (
				<div key={index} className="col-5 d-flex mb-3">
					<Switch theme="graphite-small" className="d-flex" enabled={enabled} onStateChanged={ this.toggleActivityEnabled(key) } />
					<span className={activityClasses}>{ activity }</span>
				</div>
			);
		})
	}

  render() {
		const { enabled } = this.state;

		const headingClasses = classnames(
			'font-weight-light h2 mb-0 pl-4',
			enabled ? 'text-dark' : 'text-secondary'
		);

    return (
      <div className="App position-absolute text-left d-flex justify-content-center align-items-start pt-5 h-100 w-100">
				<div className="d-flex flex-wrap mt-5" style={{width: 600}}>

					<div className="d-flex p-4 border rounded align-items-center w-100">
						<Switch theme="default" className="d-flex" enabled={enabled} onStateChanged={this.toggleNotifications} />
						<span className={headingClasses}>Notifications</span>
					</div>

					{ enabled && (
						<div className="w-100 mt-5">
							<div className="container-fluid px-0">

								<div className="pt-5">
									<div className="d-flex justify-content-between align-items-center">
										<span className="d-block font-weight-bold text-secondary small">Email Address</span>
										<span className="text-secondary small mb-1 d-block">
											<small>Provide a valid email address with which to receive notifications.</small>
										</span>
									</div>

									<div className="mt-2">
										<input type="text" placeholder="mail@domain.com" className="form-control" style={{ fontSize: 14 }} />
									</div>
								</div>

								<div className="pt-5 mt-4">
									<div className="d-flex justify-content-between align-items-center border-bottom pb-2">
										<span className="d-block font-weight-bold text-secondary small">Filter Notifications</span>
										<span className="text-secondary small mb-1 d-block">
											<small>Select the account activities for which to receive notifications.</small>
										</span>
									</div>

									<div className="mt-5">
										<div className="row flex-column align-content-start" style={{ maxHeight: 180 }}>
											{ this.renderNotifiableActivities() }
										</div>
									</div>
								</div>

							</div>
						</div>
					) }

				</div>
      </div>
    );
  }
}

export default App;
