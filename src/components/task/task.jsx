import React, { useState, useEffect } from 'react';
import PropTypes, { number } from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default function Task(props) {
  const [inputValue, setInputValue] = useState(props.description);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(props.allSeconds);
  let timer;

  const handleStart = () => {
    timer = setInterval(() => {
      const newCount = count - 1;
      setCount(newCount >= 0 ? newCount : 0);
      setRunning(true);
    }, 1000);
  };

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (running) {
      case true:
        handleStart();
    }

    if (count === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, count]);

  const handleStop = () => {
    if (timer) {
      clearInterval(timer);
      setRunning(false);
    }
  };

  function format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  const {
    description, time, id, done, edit, onCompleted, onEdited, onEdit, onDeleted,
  } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    onEdit(id, inputValue);
    onEdited(id);
  };

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const inputString = (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" onChange={onChange} value={inputValue} />
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
            <button className="icon icon-play" type="button" aria-label="Editing tasks" onClick={handleStart} />
            <button className="icon icon-pause" type="button" aria-label="Editing tasks" onClick={handleStop} />
            {format(count)}
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

Task.defaultProps = {
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
