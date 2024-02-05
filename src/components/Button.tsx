import { FC } from "react";

interface ButtonProps {
    variant?: string;
    type?: "button" | "submit" | "reset";
    onClick?: Function;
    children?: string;
}

export const Button: FC<ButtonProps> = ({
    variant = "",
    type = "button",
    onClick = null,
    children,
}) => {
    type Obj = { [key: string]: string }; // object index signature to avoid getting type error

    const variants: Obj = {
        primary:
            "bg-primary text-primary-text hover:bg-primary-dark focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-primary dark:focus:ring-bg-primary-dark",
        success:
            "bg-success text-primary-text hover:bg-success-dark active:bg-success focus:ring-green-300 dark:bg-green-600 dark:hover:bg-success dark:focus:ring-bg-success-dark",
        outline:
            "bg-transparent text-primary font-semibold hover:text-primary-text border border-primary hover:border-transparent hover:bg-primary-dark",
    };

    const baseStyle =
        "focus:outline-none focus:ring-4 active:bg-primary transition-all font-medium py-2 px-4 rounded-md "; // space at the end is required to separate css classes;
    const finalStyle = baseStyle + variants[variant || "primary"];
    return (
        <button
            className={finalStyle}
            type={type}
            onClick={() => onClick && onClick()}
        >
            {children}
        </button>
    );
};
