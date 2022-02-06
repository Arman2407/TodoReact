import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './list-tasks.css';

function ListTasks({
  todos,
  onCompleted,
  onEdited,
  onEdit,
  onDeleted,
}) {
  const newTask = todos.map((item) => {
    const {
      id,
    } = item;
    return (
      <Task
        key={id}
        onCompleted={() => onCompleted(id)}
        onDeleted={() => onDeleted(id)}
        onEdited={() => onEdited(id)}
        onEdit={onEdit}
        {...item}
      />
    );
  });

  return <ul className="todo-list">{newTask}</ul>;
}

ListTasks.defaultProps = {
  todos: [],
  onCompleted: () => {},
  onEdited: () => {},
  onEdit: () => {},
  onDeleted: () => {},
};

ListTasks.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default ListTasks;
