import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Dashboard.css";
import preview from "./preview.png";
import Header from "./Header/Header";
import List from "./List/List";
import BtnGroup from "./BtnGroup/BtnGroup";
import { fetchTasks } from "../../server/api";

function Dashboard({ currentSection }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks(userId);
        if (response.data.success) {
          const tasks = response.data.tasks.map(task => ({
            ...task,
            done: task.done === 1
          }));
          setAllTodos(tasks);
          setFilteredTodos(tasks);
        }
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    getTasks();
  }, [userId]);

  const filterTasks = useCallback((section) => {
    if (section === "Dashboard") {
      setFilteredTodos(allTodos);
    } else if (section === "Active") {
      setFilteredTodos(allTodos.filter(task => !task.done));
    } else if (section === "Completed") {
      setFilteredTodos(allTodos.filter(task => task.done));
    }
  }, [allTodos]);

  useEffect(() => {
    filterTasks(currentSection);
  }, [currentSection, filterTasks]);

  function sortTasks(tasks) {
    return tasks.sort((a, b) => {
      if (a.done === b.done) {
        return 0;
      }
      return a.done ? 1 : -1;
    });
  }

  const sortedTasks = useMemo(() => sortTasks([...filteredTodos]), [filteredTodos]);

  function calculatePercents(current, total) {
    return Math.round((current / total) * 100);
  }

  const taskCounts = sortedTasks.reduce(
    (acc, task) => {
      if (task.done) {
        acc.done += 1;
      } else {
        acc.notDone += 1;
      }
      return acc;
    },
    { done: 0, notDone: 0 }
  );

  const total = taskCounts.done + taskCounts.notDone;
  taskCounts.done = calculatePercents(taskCounts.done, total);
  taskCounts.notDone = calculatePercents(taskCounts.notDone, total);

  return (
    <div className="dashboard-wrapper">
      {currentSection === "Dashboard" && (
        <>
          <div className="dashboard-top">
            <h1 className="greeting">Hello there!</h1>
            <p>What do you want to do today?</p>
            <img src={preview} alt="young smiling woman working at laptop" className="preview-img" />
          </div>
          {isMobile && <BtnGroup counts={taskCounts} />}
        </>
      )}
      <Header displayDeleteBtn={currentSection === "Dashboard" ? true : false} />
      <div className="list__flex-group">
        <List todos={sortedTasks} />
        {!isMobile && currentSection === "Dashboard" && <BtnGroup counts={taskCounts} />}
      </div>
    </div>
  );
}

export default Dashboard;
