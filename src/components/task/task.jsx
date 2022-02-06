import React, { Component } from 'react';
import PropTypes, { number } from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  static defaultProps = {
    description: '',
    time: number,
    id: 0,
    allSeconds: 0,
    done: false,
    edit: false,
    onCompleted: () => {},
    onEdited: () => {},
    onEdit: () => {},
    onDeleted: () => {},
  };

  state = {
    inputValue: this.props.description,
    running: false,
    count: this.props.allSeconds,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      // eslint-disable-next-line default-case
      switch (this.state.running) {
        case true:
          this.handleStart();
      }
    }

    if (this.state.count === 0) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleStart = () => {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
        { count: newCount >= 0 ? newCount : 0 },
      );
    }, 1000);
  };

  handleStop = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState(
        { running: false },
      );
    }
  };

  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  render() {
    const { inputValue, count } = this.state;
    const {
      description, time, id, done, edit, onCompleted, onEdited, onEdit, onDeleted,
    } = this.props;

    this.onSubmit = (event) => {
      event.preventDefault();
      onEdit(id, inputValue);
      onEdited(id);
    };

    this.onChange = (event) => {
      this.setState({ inputValue: event.target.value });
    };

    const inputString = (
      <form onSubmit={this.onSubmit}>
        <input type="text" className="edit" onChange={this.onChange} value={inputValue} />
      </form>
    );

    const date = `created ${formatDistanceToNow(time, { includeSeconds: true })} ago`;

    let classNames = '';
    let isChecked = false;

    if (done) {
      classNames += 'completed';
      isChecked = true;
    }

    if (edit) {
      classNames += ' editing';
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={isChecked} onChange={onCompleted} />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" type="button" aria-label="Editing tasks" onClick={this.handleStart} />
              <button className="icon icon-pause" type="button" aria-label="Editing tasks" onClick={this.handleStop} />
              {this.format(count)}
            </span>
            <span className="description">{date}</span>
          </label>
          <button aria-label="Editing tasks" type="button" className="icon icon-edit" onClick={onEdited} />
          <button aria-label="Deleting task" type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {edit ? inputString : null}
      </li>
    );
  }
}

Task.propTypes = {
  description: PropTypes.string,
  time: PropTypes.number,
  id: PropTypes.number,
  allSeconds: PropTypes.number,
  done: PropTypes.bool,
  edit: PropTypes.bool,
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
};
