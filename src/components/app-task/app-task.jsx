import React, { Component } from 'react';
import PropTypes, { number } from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './app-task.css';

export default class Task extends Component {
  static defaultProps = {
    description: '',
    time: number,
    id: 0,
    done: false,
    edit: false,
    onCompleted: () => {},
    onEdited: () => {},
    onEdit: () => {},
    onDeleted: () => {},
  };

  state = {
    inputValue: this.props.description,
  };

  render() {
    const { inputValue } = this.state;

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
            <span className="description">{description}</span>
            <span className="created">{date}</span>
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
  done: PropTypes.bool,
  edit: PropTypes.bool,
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
};
