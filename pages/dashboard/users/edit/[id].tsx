import { SignalCellularConnectedNoInternet4BarSharp } from "@material-ui/icons"
import axios, { AxiosResponse } from "axios"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import DashboardLayout from "../../../../components/layouts/dashboard"
import { backendUrl } from "../../../../middleware/global"
import { getUser } from "../../../../middleware/utils"
import FormStatus from '../../../../components/parts/general/atoms/status/formStatus'
import { JsonResponse } from "../../../api/global"

type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
    deleted_at?: string
}

interface Values {
    first_name: string;
    last_name: string;
    email: string
}

export default function EditUser() {
    const router = useRouter()
    const { id } = router.query

    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)

    const [status, setStatus] = useState("success")
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")

    const fetchData = async (idUser: any) => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${backendUrl}/user/${idUser}`)

            if (res.data) {
                const { data } = res.data
                setUser(data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData(id)
    }, [id])

    return (
        <DashboardLayout>
            <Container>
                <div className="content-admin">
                    <h2>Edit User</h2>
                    <FormStatus message={message} show={show} status={status} />
                    <div className="p-3 rounded bg-white shadow">
                        {isLoading ? (
                            <p>Sedang Memuat...</p>
                        ) : (
                            <Formik
                                initialValues={user}
                                onSubmit={async (values: Values) => {
                                    setShow(false)
                                    try {
                                        const res: AxiosResponse<JsonResponse> = await axios.put(`${backendUrl}/user/edit/${id}`, values)

                                        if (res.data) {
                                            const { message } = res.data

                                            setMessage("User berhasil diperbarui")
                                            setShow(true)
                                            setStatus("success")
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
                                            <div className="mb-4">

                                            </div>
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
                                        <button type="submit" className="btn btn-success" disabled={isSubmitting}> { isSubmitting ? 'Menyimpan...' : 'Simpan' }</button>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>
            </Container>
        </DashboardLayout>
    )
}

export async function getServerSideProps(context) {
    const { req } = context
    let user = null
    try {
        user = await getUser(req)
    } catch (e) {
        console.log(e)
    }

    if (!user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
        }, // will be passed to the page component as props
    }
}