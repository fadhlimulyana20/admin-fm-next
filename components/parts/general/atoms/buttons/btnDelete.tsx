import React from "react"

type Props = {
    children: React.ReactNode,
    onClick?: (any) => any,
    className?: string,
    id?: string | number | any
}

export default function ButtonDelete({ children, onClick, className, id }: Props) {
    return (
        <button id={id} className={`btn btn-outline-danger ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}