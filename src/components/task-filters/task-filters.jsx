import React from 'react';
import PropTypes from 'prop-types';

import './task-filters.css';

export default function TaskFilters(props) {
  let buttons;

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const { filter, onFilterChange } = props;

  buttons = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : null;

    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

TaskFilters.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TaskFilters.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
