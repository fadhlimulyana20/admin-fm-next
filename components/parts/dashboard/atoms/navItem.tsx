import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link'
import React from "react";
import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode
    href: string
}

export default function NavItem({ children, href }: Props) {
    const router = useRouter()
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (router.pathname.includes(href) && href != "/dashboard") {
            setActive(true)
        }else if (href == "/dashboard") {
            if (router.pathname == href) {
                setActive(true)
            }
        }
    }, [href, router.pathname])

    return (
        <li className={`nav-item mb-1 ${active ? 'active' : ''}`}>
            <Link href={href}>
                <a className="nav-link">
                    {children}
                </a>
            </Link>
        </li>
    )
}