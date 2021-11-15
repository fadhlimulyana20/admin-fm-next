import React from 'react'
import Link from 'next/link'

type BtnType = "link" |"button"

type Props = {
    children: React.ReactNode,
    onClick?: () => {},
    className?: string,
    BtnType?: BtnType,
    href?: any
}

export default function ButtonEdit({ children, onClick, className, BtnType="button", href }: Props) {
    if (BtnType == "button") {
        return (
            <button className={`btn btn-zy-outline-success ${className}`} onClick={onClick}>
                {children}
            </button>
        )
    }

    return (
        <Link href={href} passHref>
            <a className={`btn btn-zy-outline-success ${className}`} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}