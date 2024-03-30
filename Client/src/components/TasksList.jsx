import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TasksCard } from "./TasksCard";
export function TasksList() {
  const [task, setTasks] = useState([]);
  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3"> 
        {task.map((task) => (
       <TasksCard key={task.id} task={task}/>
        ))}
    </div>
  );
}
