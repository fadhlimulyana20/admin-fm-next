import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getUser } from '../../../../middleware/utils'
import Cookies from 'js-cookie'
import axios, { AxiosResponse } from 'axios'
import { backendUrl } from '../../../../middleware/global'
import { useRouter } from 'next/dist/client/router'
import { JsonResponse } from "../../../../contexts/types";
import Image from 'next/image'
import { Context } from '../../../../contexts/store'

type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
    deleted_at?: string
}

export default function Navbar() {
    const {globalState, dispatch} = useContext(Context)

    const router = useRouter()

    // const fetchUser = (token: string) => {
    //     axios.get<JsonResponse, AxiosResponse<JsonResponse>>(`${backendUrl}/auth/me`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(res => {
    //         setUser(res.data.data)
    //     }).catch(err => {
    //         router.push('/')
    //     })
    // }

    // useEffect(() => {
    //     const token = Cookies.get("token")
    //     console.log(token)
    //     fetchUser(token)
    // }, [])

    const fetchLogout = async () => {
        try {
            const res: AxiosResponse<JsonResponse> = await axios.get('/api/logout')

            if(res.data) {
                dispatch({ type: 'LOGOUT', payload: null })
                router.push('/')
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow py-3 rounded-pill-bottom fixed-top">
            <div className="container-fluid px-lg-5">
                <div className="d-flex justify-content-start align-items-center">
                    <button id="sidebarCollapse" className="d-inline d-md-none btn btn-sm btn-outline-dark me-2">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <Link href="/">
                        <a className="navbar-brand fw-bold d-flex align-items-center">
                            Kuadran
                            {/* <Image src='/logo-removebg-preview.png' layout="fixed" alt="zyklus-logo" width="84" height="46" /> */}
                        </a>
                    </Link>
                </div>

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <Nav>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={( 
                                <span>
                                    <FontAwesomeIcon icon={faUser} /> 
                                    <span className='ms-2 mb-0'>
                                        {globalState.isUserAuthenticated ? globalState.loggedUser.username : ''}
                                    </span>
                                </span>
                            )}
                            menuVariant="light"
                            align="end"
                        >
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => fetchLogout()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </ul>
            </div>
        </nav>
    )
}