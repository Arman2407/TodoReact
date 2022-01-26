import React from 'react';
import PropTypes from 'prop-types';

import Task from '../app-task';
import './app-list-tasks.css';

function TaskList({
  todos,
  onCompleted,
  onEdited,
  onEdit,
  onDeleted,
}) {
  const newTask = todos.map((item) => {
    const {
      id,
      description,
      time,
      done,
      edit,
    } = item;
    return (
      <Task
        onCompleted={() => onCompleted(id)}
        onDeleted={() => onDeleted(id)}
        onEdited={() => onEdited(id)}
        onEdit={onEdit}
        id={id}
        key={id}
        description={description}
        time={time}
        done={done}
        edit={edit}
      />
    );
  });

  return <ul className="todo-list">{newTask}</ul>;
}

TaskList.defaultProps = {
  todos: [],
  onCompleted: () => {},
  onEdited: () => {},
  onEdit: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default TaskList;
