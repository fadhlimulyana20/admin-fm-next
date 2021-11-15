import React, { useContext } from "react";
import DashboardLayout from "../../components/layouts/dashboard";
import { Context } from "../../contexts/store";
import Head from 'next/head';
import { Container } from "react-bootstrap";

export default function Index() {
    const { globalState, dispatch } = useContext(Context);

    return (
        <DashboardLayout>
            <Head>
                <title>Dasbor</title>
            </Head>
            <Container>
                <div className="content-admin">
                    <div className="alert alert-success p-3 px-4 rounded-3">
                        <h5 className="mb-0">Halo, {globalState.loggedUser ? globalState.loggedUser.first_name : ''} 👋</h5>
                        <p className="mb-0">Apa kabar kamu hari ini?</p>
                    </div>
                </div>
            </Container>
        </DashboardLayout>
    )
}