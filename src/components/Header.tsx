import { FC, useState } from "react";
import Logo from "../assets/tasklist-logo.png";
import { themeList } from "../App";

interface HeaderProps {
    themeState: [string, Function];
}

export const Header: FC<HeaderProps> = ({ themeState }) => {
    const [theme, setTheme] = themeState;
    const themes = Object.keys(themeList);
    const [flyOutOpen, SetFlyOutOpen] = useState<boolean>(false);

    const changeTheme = (theme: string) => {
        setTheme(theme);
        SetFlyOutOpen(() => false);
        document.body.className = theme;
    };

    return (
        <header className="bg-section flex shadow-md p-4 justify-between items-center rounded-md mb-10 ">
            <div className="flex gap-3">
                <img
                    className="inline-block"
                    width={42}
                    src={Logo}
                    alt="tasklist logo"
                />
                <span className="text-2xl font-medium">Tasklist</span>
            </div>
            <div
                className="relative shadow-inner p-1"
                onMouseEnter={() => SetFlyOutOpen(() => true)}
                onMouseLeave={() => SetFlyOutOpen(() => false)}
            >
                <ThemeRect
                    theme={theme}
                    changeTheme={(t: string) => setTheme(() => t)}
                />
                <FlyOut open={flyOutOpen}>
                    {themes.map(
                        (t) =>
                            t !== theme && (
                                <ThemeRect
                                    key={t}
                                    theme={t}
                                    changeTheme={changeTheme}
                                />
                            )
                    )}
                </FlyOut>
            </div>
        </header>
    );
};

interface flyOutProps {
    open: boolean;
    children: React.ReactNode;
}

const FlyOut: FC<flyOutProps> = ({ open, children }) => {
    return (
        open && (
            <div className=" absolute left-1/2 top-1/3 z-10 mt-5 flex -translate-x-1/2 px-4">
                <div className="max-w-md overflow-hidden rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 p-4 scale-90 flex flex-col gap-4">
                    {children}
                </div>
            </div>
        )
    );
};

interface ThemeRectProps {
    theme: string;
    changeTheme: Function;
}

const ThemeRect: FC<ThemeRectProps> = ({ theme = "light", changeTheme }) => {
    const onChangeTheme = () => {
        changeTheme(theme);
    };

    const style = `${themeList[theme]} bg-body from-gfrom inline-block w-16 h-6 rounded-sm shadow-md cursor-pointer -skew-x-6 transition-all hover:scale-110`;

    return (
        <span
            className={style}
            role="button"
            aria-label={`set ${theme} theme`}
            onClick={() => onChangeTheme()}
        ></span>
    );
};
