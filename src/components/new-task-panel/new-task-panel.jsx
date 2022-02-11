/* eslint-disable id-length */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-panel.css';

export default function NewTaskPanel(props) {
  const [description, setDescription] = useState('');
  const [placeholder, setPlaceholder] = useState('What needs to be done?');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onChangeMin = (e) => {
    const toSeconds = e.target.value * 60;

    setMinutes(toSeconds);
  };

  const onChangeSec = (e) => {
    setSeconds(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    props.onAddItem(description, Number(minutes) + Number(seconds));
    setDescription('');
    setPlaceholder('What needs to be done?');

    event.target.reset();
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder={placeholder}
        onChange={onDescriptionChange}
        value={description}
      />
      <input className="new-todo-form__timer" type="number" placeholder="Min" min="0" onChange={onChangeMin} />
      <input className="new-todo-form__timer" type="number" placeholder="Sec" min="0" max="59" onChange={onChangeSec} />
      <input type="submit" className="hidden" />
    </form>
  );
}

NewTaskPanel.defaultProps = {
  onAddItem: () => {},
};

NewTaskPanel.propTypes = {
  onAddItem: PropTypes.func,
};
