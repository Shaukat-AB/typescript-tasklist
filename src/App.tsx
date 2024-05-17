import { useEffect, useState } from "react";
import { AddTask, ShowTask, Header, ThemeWrapper, Task} from "./components";

// retrive taskList from local storage it has two keys tasks and theme
const storedList = localStorage.getItem("taskList");
const initialState = storedList ? JSON.parse(storedList)?.tasks : [];
const initialTheme = storedList ? JSON.parse(storedList)?.theme : "light";

function App() {
    const [tasks, setTasks] = useState<Task[]>([...initialState]);
    const [taskEdited, setTaskEdited] = useState<Task | null>(null);
    const [theme, setTheme] = useState<string>(initialTheme);

    const onAddTask = (task: Task) => {
        const newTasks = [...tasks];
        // run when task is updated and is not added.
        if (taskEdited) {
            // remove outdated task
            newTasks.splice( tasks.indexOf(taskEdited), 1);
            setTaskEdited(null);
        }
        setTasks([...newTasks, task]);
    };

    const onEditTask = (task: Task) => {
        setTaskEdited(task);
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
        <ThemeWrapper theme={theme}>
            <div className="max-w-[1200px] px-4 mx-auto cursor-default">
                <Header themeState={[theme, setTheme]} />
                <AddTask onAddTask={onAddTask} taskEdited={taskEdited} />
                <ShowTask
                    taskState={[tasks, setTasks]}
                    onEditTask={onEditTask}
                />
            </div>
        </ThemeWrapper>
    );
}

export default App;