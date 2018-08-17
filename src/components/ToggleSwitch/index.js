import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component } from 'react';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import './index.css';

class ToggleSwitch extends Component {

	state = {
		enabled: this.enabledFromProps()
	}

	isEnabled() {
		return this.state.enabled;
	}

	enabledFromProps() {
		let { enabled } = this.props;
		enabled = isFunction(enabled) ? enabled() : enabled;

		return isBoolean(enabled) && enabled;
	}

	toggleSwitch = evt => {
		evt.persist();
		evt.preventDefault();

		const { onClick, onStateChanged } = this.props;

		this.setState({ enabled: !this.state.enabled }, () => {
			const state = this.state;
			const switchEvent = Object.assign(evt, { SWITCH_STATE: state });

			isFunction(onClick) && onClick(switchEvent);
			isFunction(onStateChanged) && onStateChanged(state);
		});
	}

	render() {
		const { enabled } = this.state;
		const { enabled: _enabled, onClick, onStateChanged, ...restProps } = this.props;

		const switchClasses = classnames(
			'switch-toggle',
			`switch-toggle--${enabled ? 'on' : 'off'}`
		)

		return (
			<div onClick={this.toggleSwitch} {...restProps}>
				<div className={switchClasses}></div>
			</div>
		)
	}

}

ToggleSwitch.propTypes = {
	enabled: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.func
	]),
	onStateChanged: PropTypes.func
}

export default ToggleSwitch;
