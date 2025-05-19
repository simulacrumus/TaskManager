import React from "react";
import type { Task, UpdateTask } from "../../../../types/Task";
import { textStyles } from "../styles";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";

type TaskItemProps = {
  task: Task;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, task: UpdateTask) => Promise<void>
  onClick: () => void
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate, onClick }) => {

  const onChangeOfIsComplete = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {
      const updateTask: UpdateTask = {
        ...task,
        isCompleted: event.target.checked,
      };
      await onUpdate(task.id, updateTask);
    } catch (error) {
      console.error("Error while updating task:", error);
    }
  };

  const onDeleteTask = async () => {
    try {
      await onDelete(task.id)
    } catch (error) {
      console.error("Error while deleting task:", error);
    }
  };

  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <Stack direction={"row"} spacing={1}>
          <Checkbox
            onChange={onChangeOfIsComplete}
            edge="start"
            checked={task.isCompleted}
            tabIndex={-1}
          />
          <IconButton edge="end" aria-label={"delete"} onClick={onDeleteTask}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={onClick}>
        <ListItemText
          id={`${task.id}`}
          primary={task.title}
          secondary={task.description}
          sx={{
            ...textStyles,
            textDecoration: task.isCompleted ? "line-through" : "",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
