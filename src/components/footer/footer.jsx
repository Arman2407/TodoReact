import React from 'react';
import PropTypes from 'prop-types';

import TaskFilters from '../task-filters';
import './footer.css';

function Footer({
  doneCount, clearTasks, filter, onFilterChange,
}) {
  let todoCount = 'Нет задач!';
  if (doneCount) {
    todoCount = `${doneCount} items left`;
  }

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount}</span>
      <TaskFilters filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearTasks}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  doneCount: 0,
  clearTasks: () => {},
  filter: 'all',
  onFilterChange: () => {},
};

Footer.propTypes = {
  filter: PropTypes.string,
  doneCount: PropTypes.number,
  clearTasks: PropTypes.func,
  onFilterChange: PropTypes.func,
};

export default Footer;
