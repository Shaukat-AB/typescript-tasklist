import { FC, ReactNode } from "react";
import { Obj } from ".";

export const themeList: Obj = {
    light: "light bg-gradient-to-r",
    gotham: "gotham bg-gradient-to-r via-slate-900",
    midnight: "midnight bg-gradient-to-r via-blue-800",
    witch: "witch bg-gradient-to-r via-purple-900",
    sand: "sand bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] via-amber-100",
    flame: "flame bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] via-violet-600",
    rocket: "rocket bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800",
};

interface ThemeWrapperProps {
    theme: keyof Obj,
    children: ReactNode,
}

export const ThemeWrapper: FC<ThemeWrapperProps> = ({theme, children}) => {
    return (
        <div
            className={
                "bg-body from-gfrom min-h-screen py-3 transition-colors duration-300 dark:text-gray-100 " +
                themeList[theme]
            }
        >
            {children}
        </div>
    );
};
