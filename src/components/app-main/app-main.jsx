import React from 'react';
import PropTypes from 'prop-types';

import TaskList from '../app-list-tasks';
import AppFooter from '../app-footer';
import './app-main.css';

function AppMain({
  todos,
  onCompleted,
  onEdited,
  onEdit,
  onDeleted,
  doneCount,
  clearTasks,
  filter,
  onFilterChange,
}) {
  return (
    <section className="main">
      <TaskList todos={todos} onCompleted={onCompleted} onEdited={onEdited} onEdit={onEdit} onDeleted={onDeleted} />
      <AppFooter doneCount={doneCount} clearTasks={clearTasks} filter={filter} onFilterChange={onFilterChange} />
    </section>
  );
}

AppMain.defaultProps = {
  todos: [],
  filter: 'all',
  onCompleted: () => {},
  onEdited: () => {},
  onEdit: () => {},
  onDeleted: () => {},
  doneCount: () => {},
  clearTasks: () => {},
  onFilterChange: () => {},
};

AppMain.propTypes = {
  doneCount: PropTypes.number,
  todos: PropTypes.instanceOf(Array),
  filter: PropTypes.string,
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  clearTasks: PropTypes.func,
  onFilterChange: PropTypes.func,
};

export default AppMain;
