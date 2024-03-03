import React from 'react';
import styles from './Filter.module.css';

function Filter({ value, onChangeFilter }) {
  return (
    <div>
      <label className={styles.label}>
        Find contacts by name
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
}

export default Filter;
