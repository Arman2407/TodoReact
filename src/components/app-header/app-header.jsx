import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-panel';
import './app-header.css';

function AppHeader({ onAddItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAddItem={onAddItem} />
    </header>
  );
}

AppHeader.defaultProps = {
  onAddItem: () => {},
};

AppHeader.propTypes = {
  onAddItem: PropTypes.func,
};

export default AppHeader;
