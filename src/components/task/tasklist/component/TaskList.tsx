import React from "react";
import { Divider, List, Box } from "@mui/material";
import type { CreateTask, Task, UpdateTask } from "../../../../types/Task";
import { taskListStyles as styles } from "../styles";
import { TaskItem } from "../../taskitem/component/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onSave: (task: CreateTask) => Promise<void>;
  onUpdate: (id:number, task: UpdateTask) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onOpen: (id:number) => void
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onSave, onUpdate, onDelete, onOpen }) => {
  return (
    <List sx={styles}>
      {tasks.map((task) => {
        return (
          <Box key={task.id}>
            <TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} onClick={()=> onOpen(task.id)}/>
            <Divider />
          </Box>
        );
      })}
    </List>
  );
};