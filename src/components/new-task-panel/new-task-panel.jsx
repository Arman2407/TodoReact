/* eslint-disable id-length */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-panel.css';

export default class NewTaskPanel extends Component {
  static defaultProps = {
    onAddItem: () => {},
  };

  state = {
    description: '',
    placeholder: 'What needs to be done?',
    minutes: 0,
    seconds: 0,
  };

  onDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onChangeMin = (e) => {
    const toSeconds = e.target.value * 60;

    this.setState({
      minutes: toSeconds,
    });
  };

  onChangeSec = (e) => {
    this.setState({
      seconds: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onAddItem(this.state.description, Number(this.state.minutes) + Number(this.state.seconds));
    this.setState({
      description: '',
      placeholder: 'What needs to be done?',
    });

    event.target.reset();
  };

  render() {
    const { placeholder } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder={placeholder}
          onChange={this.onDescriptionChange}
          value={this.state.description}
        />
        <input className="new-todo-form__timer" type="number" placeholder="Min" min="0" onChange={this.onChangeMin} />
        <input className="new-todo-form__timer" type="number" placeholder="Sec" min="0" max="59" onChange={this.onChangeSec} />
        <input type="submit" className="hidden" />
      </form>
    );
  }
}

NewTaskPanel.propTypes = {
  onAddItem: PropTypes.func,
};
