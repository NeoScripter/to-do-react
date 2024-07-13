import React, { useEffect, useState } from 'react';
import { fetchTasks } from './api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks(userId);
        if (response.data.success) {
          setTasks(response.data.tasks);
        }
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    getTasks();
  }, [userId]);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text} - {task.done ? 'Completed' : 'Incomplete'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
