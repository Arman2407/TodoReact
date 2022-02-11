import React, { useState } from 'react';

import Header from '../header';
import './app.css';
import ListTasks from '../list-tasks';
import Footer from '../footer';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addItem = (description, allSeconds) => {
    let maxId = 100;
    const newItem = {
      description,
      time: Date.now(),
      done: false,
      edit: false,
      id: maxId++,
      allSeconds,
    };

    const newTasks = [...tasks];
    newTasks.push(newItem);

    setTasks(newTasks);
  };

  const onDataChange = (id, array, typeChange, props) => {
    const idx = array.findIndex((el) => el.id === id);
    const newTasks = [...array];
    if (typeChange === 'change') {
      newTasks[idx][props] = !newTasks[idx][props];
    }

    if (typeChange === 'deleted') {
      newTasks.splice(idx, 1);
    }

    return newTasks;
  };

  const onCompleted = (id) => {
    setTasks(onDataChange(id, tasks, 'change', 'done'));
  };

  const onEdited = (id) => {
    setTasks(onDataChange(id, tasks, 'change', 'edit'));
  };

  const onEdit = (id, newText) => {
    const idx = tasks.findIndex((el) => el.id === id);
    const newTasks = [...tasks];
    newTasks[idx].description = newText;
    setTasks(newTasks);
  };

  const onDeleted = (id) => {
    setTasks(onDataChange(id, tasks, 'deleted'));
  };

  const clearTasks = () => {
    let newTasks = [...tasks];
    newTasks = newTasks.filter((el) => !el.done);
    setTasks(newTasks);
  };

  const onFilterChange = (filterNew) => {
    setFilter(filterNew);
  };

  function filterItems(arr, filterNew) {
    switch (filterNew) {
      case 'all':
        return arr;
      case 'active':
        return arr.filter((el) => !el.done);
      case 'completed':
        return arr.filter((el) => el.done);
      default:
        return arr;
    }
  }

  const activeItems = filterItems(tasks, filter);
  const doneCount = tasks.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <Header onAddItem={addItem} />
      <section className="main">
        <ListTasks
          todos={activeItems}
          onCompleted={onCompleted}
          onDeleted={onDeleted}
          onEdit={onEdit}
          onEdited={onEdited}
        />
        <Footer
          doneCount={doneCount}
          clearTasks={clearTasks}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
}
