'use client'

import React from "react";

interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    colorPrimary?: string;
    colorSecondary?: string;
}

const sizeMap = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
};

export const Logo: React.FC<LogoProps> = ({
    size = "md",
    className = "",
    colorPrimary = "text-green-500",
    colorSecondary = "text-green-500",
}) => {
    return (
        <div className={`flex flex-col space-y-3 ${className} ${sizeMap[size]}`}>
            <span className={`${colorPrimary} flex space-x-6`}>
                <span>N</span>
                <span>E</span>
            </span>
            <span className={`${colorSecondary} flex space-x-6`}>
                <span>X</span>
                <span>O</span>
            </span>
        </div>
    );
};
