import React from 'react';
import PropTypes from 'prop-types';

import NewTaskPanel from '../new-task-panel';
import './header.css';

function Header({ onAddItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskPanel onAddItem={onAddItem} />
    </header>
  );
}

Header.defaultProps = {
  onAddItem: () => {},
};

Header.propTypes = {
  onAddItem: PropTypes.func,
};

export default Header;
