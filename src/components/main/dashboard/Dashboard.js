import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import preview from "./preview.png";
import Header from "./Header/Header";
import List from "./List/List";
import BtnGroup from "./BtnGroup/BtnGroup";

function Dashboard() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 550);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    let tasks = [
        {
            id: "task1",
            text: "Buy monthly groceries",
            done: false
        },
        {
            id: "task2",
            text: "Pick up the kids",
            done: true
        },
        {
            id: "task3",
            text: "Wash the car",
            done: false
        },
        {
            id: "task4",
            text: "Clean the dog",
            done: false
        }
    ];

    function sortTasks(tasks) {
        return tasks.sort((a, b) => {
            if (a.done === b.done) {
                return 0; // if both tasks have the same done status, keep their order
            }
            return a.done ? 1 : -1; // if a is done, it should come before b
        });
    }

    tasks = sortTasks(tasks);

    function calculatePercents(current, total) {
        return Math.round((current / total) * 100);
    }

    const taskCounts = tasks.reduce(
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
            <div className="dashboard-top">
                <h1 className="greeting">Hello there!</h1>
                <p>What do you want to do today?</p>
                <img src={preview} alt="young smiling woman working at laptop" className="preview-img" />
            </div>
            {isMobile && <BtnGroup counts={taskCounts} />}
            <Header />
            <div className="list__flex-group">
                <List todos={tasks} />
                {!isMobile && <BtnGroup counts={taskCounts} />}
            </div>
        </div>
    );
}

export default Dashboard;
