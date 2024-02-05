import { FC, FormEvent, useEffect } from "react";
import { Button } from "./Button";
import { useState } from "react";

export interface Task {
    id: string;
    title: string;
    createdAt: string;
}

interface AddTaskProps {
    onAddTask: Function;
    taskEdited: null | Task;
}

export const AddTask: FC<AddTaskProps> = ({ onAddTask, taskEdited }) => {
    const [title, setTitle] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(() => e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const date = new Date();
        const createdAt = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
        const task: Task = {
            id: date.getTime().toString(16), // get hexadecimal string of time in milliseconds
            title: title,
            createdAt: createdAt,
        };
        onAddTask(task);
        setTitle("");
    };

    useEffect(() => {
        if (taskEdited) {
            setTitle(() => taskEdited.title);
        }
        return;
    }, [taskEdited]);

    return (
        <section className="bg-section p-3 shadow-md mx-auto w-full max-w-md rounded-md mb-5 dark:bg-section-dark">
            <form
                className="flex flex-wrap justify-center gap-3"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    className="p-2 flex-1 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    type="text"
                    name="task"
                    maxLength={25}
                    minLength={3}
                    placeholder="Enter new task here"
                    onChange={(e) => handleChange(e)}
                    value={title}
                    autoComplete="off"
                    required
                />
                <Button type="submit" variant="success">
                    {taskEdited ? "update task" : "add task"}
                </Button>
            </form>
        </section>
    );
};
