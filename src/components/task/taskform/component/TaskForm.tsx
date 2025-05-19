import React, { useState } from 'react';
import type { CreateTask, Task, UpdateTask } from '../../../../types/Task';
import { titleStyles, descriptionStyles } from '../styles';
import { Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateField } from '@mui/x-date-pickers/DateField';
import { MAX_DESC_LENGTH, MAX_TITLE_LENGTH } from '../constants';

type TaskFormProps = {
  task?: Task,
  onSave: (task: CreateTask) => Promise<void>;
  onUpdate: (id:number, task: UpdateTask) => Promise<void>;
};

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onUpdate }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [titleError, setTitleError] = useState<string>('');
    const [descError, setDescError] = useState<string>('');
    const [apiError, setApiError] = useState<string>('')
    const [dueDate, setDueDate] = useState<Date | any>(new Date());
    const [taskFormData, setTaskFormData] = useState<CreateTask>({
        title:task?.title || "",
        description:task?.description || "",
        dueDate:task?.dueDate || "",
        isCompleted:task?.isCompleted || false,
    })

    const onChangeOfTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setApiError('')
        setTaskFormData({ ...taskFormData, [event.target.name]: event.target.value});
        if (event.target.value.length > MAX_TITLE_LENGTH) {
            setTitleError('Title cannot be longer than 20 characters');
        } else {
            setTitleError('')
        }
    }

    const onChangeOfDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setApiError('')
        setTaskFormData({ ...taskFormData, [event.target.name]: event.target.value});
        if (event.target.value.length > MAX_DESC_LENGTH) {
            setDescError('Description cannot be longer than 50 characters');
        } else {
            setDescError('')
        }
    }

    const onChangeOfCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setApiError('')
        console.log(event.target.name)
        setTaskFormData({ ...taskFormData, isCompleted: event.target.checked });
    };

    const isFormValid:boolean = taskFormData.title.length > 0 && taskFormData.title.length <= 30 && taskFormData.description.length <= 50 

    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        
        if(taskFormData.title.length < 1){
            setTitleError('Title cannot be empty')
        }

        setApiError('')

        if (isFormValid) {
            try {
                setIsLoading(true)
                //Delay 2 sec for testing
                await new Promise(resolve => setTimeout(resolve, 2000));
                if (task) {
                    await onUpdate(task.id, {...taskFormData})
                } else {
                    await onSave({...taskFormData});
                }
            } catch (error) {
                console.error('Error saving task:', error);
                setApiError('Sorry, something went wrong')
            } finally{
                setIsLoading(false)
            }
        }
    };
  
  return (
    <Container maxWidth="sm" disableGutters>
        <form onSubmit={onSubmitForm}>
            <Stack direction={"column"} spacing={3}>
                <Typography variant='h5'>
                    {`${(task && "Update") || "New"} Task`}
                </Typography>
                <TextField
                    sx={titleStyles}
                    error={Boolean(titleError)}
                    helperText={Boolean(titleError) && titleError}
                    label="Title"
                    margin="normal"
                    name="title"
                    value={taskFormData.title}
                    variant="outlined"
                    onChange={onChangeOfTitle}
                />

                <TextField
                    sx={descriptionStyles}
                    error={Boolean(descError)}
                    helperText={Boolean(descError) && descError}
                    label="Description"
                    margin="normal"
                    name="description"
                    value={taskFormData.description}
                    variant="outlined"
                    onChange={onChangeOfDesc}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateField
                        label="DueDate"
                        value={dueDate}
                        onChange={(newValue) => setDueDate(newValue)}
                    />
                </LocalizationProvider>
                <FormControlLabel 
                    control={
                        <Checkbox
                            onChange={onChangeOfCompleted}
                            edge="start"
                            checked={taskFormData.isCompleted}
                            tabIndex={-1}
                        />
                    } 
                    label="Completed" 
                />
                <Button
                    loading={ isLoading }
                    loadingPosition="end"
                    type="submit"
                    variant="contained"
                    sx={{ }}
                >
                    {"Save"}
                </Button>
                {apiError && <Typography sx={{color: "red"}}>{apiError}</Typography>}
            </Stack>
        </form>
    </Container>
  );
};
