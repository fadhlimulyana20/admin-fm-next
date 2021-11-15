import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import DashboardLayout from "../../../components/layouts/dashboard";
import FormStatus from "../../../components/parts/general/atoms/status/formStatus";
import { backendUrl } from "../../../middleware/global";
import { JsonResponse } from "../../api/global";

type Values = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export default function CreateUser() {
    const router = useRouter()

    const [status, setStatus] = useState("success")
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")

    return (
        <DashboardLayout>
            <Container>
                <div className="content-admin">
                    <h2>Menambahkan User</h2>
                    <FormStatus message={message} show={show} status={status} />
                    <div className="p-3 bg-white shadow rounded">
                        <Formik
                                initialValues={{
                                    email: '',
                                    first_name: '',
                                    last_name: '',
                                    password: ''
                                }}
                                onSubmit={async (values: Values) => {
                                    setShow(false)
                                    try {
                                        const res: AxiosResponse<JsonResponse> = await axios.post(`${backendUrl}/user`, values)

                                        if (res.data) {
                                            const { data } = res.data
                                            router.push('/dashboard/users')
                                        }
                                    } catch (e) {
                                        setMessage(e.response)
                                        setShow(true)
                                        setStatus("error")
                                    }
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="first_name">Nama Depan</label>
                                            <Field className="form-control" id="first_name" name="first_name" placeholder="Jane" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="last_name">Nama Belakang</label>
                                            <Field className="form-control" id="last_name" name="last_name" placeholder="Doe" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <Field className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="jane@acme.com"
                                                type="email"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <Field className="form-control" id="password" name="password" type="password" placeholder="Buat Password" />

                                        </div>
                                        <button type="submit" className="btn btn-success" disabled={isSubmitting}> { isSubmitting ? 'Menyimpan...' : 'Simpan' }</button>
                                    </Form>
                                )}
                            </Formik>
                    </div>
                </div>
            </Container>
        </DashboardLayout>
    )
}