import { FC } from "react";
import { Task } from "./AddTask";
import { Button } from "./Button";
import { HiTrash, HiPencilSquare } from "react-icons/hi2";

interface ShowTaskProps {
    taskState: [Task[], React.Dispatch<React.SetStateAction<Task[]>>];
    onEditTask: Function;
}

export const ShowTask: FC<ShowTaskProps> = ({ taskState, onEditTask }) => {
    const [tasks, setTasks] = taskState;

    const total = tasks.length;

    const onDelete = (id: string) => {
        const newTasks = tasks.filter((task: Task) => task.id !== id);
        setTasks(() => newTasks);
    };

    const onEdit = (id: string) => {
        onEditTask(id);
    };

    const onClearAll = () => {
        setTasks(() => []);
    };

    return (
        <section className="bg-section p-4 shadow-md rounded-md">
            <div className="flex justify-between mb-5 ">
                <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-medium">Todo</span>
                    <span className="text-sm flex items-center justify-center text-primary-text bg-gray rounded-full w-7 h-7">
                        {total}
                    </span>
                </div>
                <Button variant="outline" onClick={() => onClearAll()}>
                    Clear All
                </Button>
            </div>
            <ul className="flex gap-4 justify-around flex-wrap">
                {tasks.map((task: Task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        actions={[onDelete, onEdit]}
                    />
                ))}
            </ul>
        </section>
    );
};

interface TaskItemPorps {
    task: Task;
    actions: [Function, Function];
}

const TaskItem: FC<TaskItemPorps> = ({ task, actions }) => {
    const { id, title, createdAt } = task;
    const [onDelete, onEdit] = actions;

    return (
        <li className="p-3 w-full md:max-w-[350px] flex flex-wrap justify-end gap-4 shadow-md rounded-md border-l-4 border-l-primary-dark transition-colors duration-300 hover:bg-slate-100 animate-pulse-fin">
            <p className="flex-1 flex flex-col gap-2 truncate min-w-[160px]">
                <span className="text-lg font-semibold "> {title} </span>
                <span className="text-gray text-sm"> {createdAt}</span>
            </p>
            <button
                className=""
                onClick={() => onEdit(id)}
                aria-label="edit task"
            >
                <HiPencilSquare className="text-primary text-2xl" />
            </button>
            <button
                className=""
                onClick={() => onDelete(id)}
                aria-label="delete task"
            >
                <HiTrash className="text-red-700 text-2xl" />
            </button>
        </li>
    );
};
