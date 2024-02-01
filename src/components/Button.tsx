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
        primary: "bg-primary text-primary-text hover:bg-primary-dark",
        success:
            "bg-success text-primary-text hover:bg-success-dark active:bg-success",
        outline:
            "bg-transparent text-primary font-semibold hover:text-primary-text border border-primary hover:border-transparent hover:bg-primary-dark",
    };

    const baseStyle =
        "active:bg-primary transition-all duration-300 font-bold py-2 px-3 rounded "; // space at the end is required to separate css classes;
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
