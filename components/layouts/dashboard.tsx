import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../../contexts/store";
import { User } from "../../contexts/types";
import { JsonResponse } from "../../pages/api/global";
import Navbar from "../parts/dashboard/organisms/navbar";
import Sidebar from "../parts/dashboard/organisms/sidebar";
import { backendUrl } from "../prefix/backend";
import Cookies from 'js-cookie';

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout(props: Props) {
    // const { globalState, dispatch } = useContext(Context);

    // const [user, setUser] = useState<User>(null)
  
    // const router = useRouter()
  
    // const fetchUser = (token: string) => {
    //     axios.get<JsonResponse, AxiosResponse<JsonResponse>>(`${backendUrl}/auth/me`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(res => {
    //         setUser(res.data.data)
    //         dispatch({ type: "SET_USER", payload: res.data.data })
    //     }).catch(err => {
    //         dispatch({ type: 'LOGOUT', payload: null })
    //         router.push('/')
    //     })
    // }
  
    // useEffect(() => {
    //     const token = Cookies.get("token")
    //     fetchUser(token)
    // }, [])

    return (
        <React.Fragment>
            <Navbar />
            <div className="d-flex w-100">
                <Sidebar />
                <div className="content">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}