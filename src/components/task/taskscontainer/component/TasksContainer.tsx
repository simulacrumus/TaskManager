import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TaskList } from "../../tasklist/component/TaskList";
import { taskService } from "../../../../service/api/task/TaskService";
import type { CreateTask, Task, UpdateTask } from "../../../../types/Task";
import AddIcon from "@mui/icons-material/Add";
import { TaskForm } from "../../taskform/component/TaskForm";
import { Modal } from "../../../common/modal/component/Modal";

export const TasksContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] =
    useState<boolean>(false);
  const [params, setParams] = useState<Record<string, string>>({
    search: "",
    active: "false",
  });
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isActiveOnly, setIsActiveOnly] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchTasks();
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value);
    setParams({ ...params, search: event.target.value });
  };

  const onOnlyActiveFilterChange = () => {
    setIsActiveOnly(!isActiveOnly);
    setParams({ ...params, active: `${isActiveOnly}` });
    fetchTasks();
  };

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks(params);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const onSaveTask = async (task: CreateTask) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to update task:", task);
      setError("Failed to update task. Please try again.");
    } finally {
      setIsTaskFormModalOpen(false);
    }
  };

  const onUpdateTask = async (id: number, task: UpdateTask) => {
    try {
      const updatedTask = await taskService.updateTask(id, task);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", task);
      setError("Failed to update task. Please try again.");
    } finally {
      setIsTaskFormModalOpen(false);
    }
  };

  const onDeleteTask = async (id: number) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      await taskService.deleteTask(id);
    } catch (error) {
      console.error("Failed to delete task:", error);
      fetchTasks();
      setError("Failed to delete task. Please try again.");
    }
  };

  const onOpenTaskFormModal = (id?: number) => {
    const foundTask = tasks.find((task) => task.id === id);
    setTask(foundTask);
    setIsTaskFormModalOpen(true);
  };

  return (
    <Container>
      <Modal
        open={isTaskFormModalOpen}
        onClose={() => setIsTaskFormModalOpen(false)}
      >
        <TaskForm task={task} onSave={onSaveTask} onUpdate={onUpdateTask} />
      </Modal>
      <Box sx={{ pb: 1 }}>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Stack direction={"row"} spacing={3}>
        <TextField
          sx={{}}
          label={"Search"}
          size="small"
          margin="normal"
          name="search"
          value={query}
          variant="outlined"
          onChange={onSearchChange}
        />
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={() => {
            onOpenTaskFormModal();
          }}
        >
          {"New"}
        </Button>
        <Button variant="outlined" onClick={onOnlyActiveFilterChange}>
          {isActiveOnly ? "Show All" : "Show Active"}
        </Button>
      </Stack>
      <TaskList
        tasks={tasks}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
        onSave={onSaveTask}
        onOpen={onOpenTaskFormModal}
      />
      {tasks.length === 0 && (
        <Alert severity="info"> {"No tasks found. Create a new task to get started!"}</Alert>
        // <Typography variant="h6" color="text.secondary" sx={{ pt: 10 }}>
          
        // </Typography>
      )}
    </Container>
  );
};
