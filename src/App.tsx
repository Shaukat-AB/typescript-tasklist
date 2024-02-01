import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { AddTask, Task } from "./components/AddTask";
import { ShowTask } from "./components/ShowTask";

// retrive taskList where keys are tasks, theme from local storage
const storedList = localStorage.getItem("taskList");
const initialState = storedList ? JSON.parse(storedList)?.tasks : [];
const initialTheme = storedList ? JSON.parse(storedList)?.theme : "light";

type Obj = { [key: string]: string }; // object index signature to avoid getting type error for "theme";
export const themeList: Obj = {
    light: "light bg-gradient-to-r",
    gotham: "gotham bg-gradient-to-r via-slate-900",
    midnight: "midnight bg-gradient-to-r via-blue-800",
    witch: "witch bg-gradient-to-r via-purple-900",
    sand: "sand bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] via-amber-100",
    flame: "flame bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] via-violet-600",
    rocket: "rocket bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800",
};

function App() {
    const [tasks, setTasks] = useState<Task[]>([...initialState]);
    const [taskEdited, setTaskEdited] = useState<Task | null>(null);
    const [theme, setTheme] = useState<string>(initialTheme);

    const onAddTask = (task: Task) => {
        const newTasks = [...tasks];
        if (taskEdited) {
            // run when task is updated and is not added.
            const index = tasks.indexOf(taskEdited);
            newTasks.splice(index, 1, task); // remove outdated task with updated task
            setTaskEdited(() => null);
        }
        !taskEdited && newTasks.push(task); // this runs only when a new task is added.
        setTasks(() => newTasks);
    };

    const onEditTask = (id: string) => {
        const [task] = tasks.filter((task) => task.id === id);
        setTaskEdited(() => task);
    };

    useEffect(() => {
        const storeData = () => {
            localStorage.setItem(
                "taskList",
                JSON.stringify({ theme: theme, tasks: tasks })
            );
        };
        return storeData();
    }, [tasks, theme]);

    return (
        <div
            className={
                "bg-body from-gfrom min-h-screen py-3 transition-colors duration-300 " +
                themeList[theme]
            }
        >
            <div className="max-w-[1200px] px-4 mx-auto cursor-default">
                <Header themeState={[theme, setTheme]} />
                <AddTask onAddTask={onAddTask} taskEdited={taskEdited} />
                <ShowTask
                    taskState={[tasks, setTasks]}
                    onEditTask={onEditTask}
                />
            </div>
        </div>
    );
}

export default App;
