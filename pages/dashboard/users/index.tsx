import MUIDataTable from 'mui-datatables'
import axios, { AxiosResponse } from 'axios'
import { backendUrl } from '../../../middleware/global'
import DashboardLayout from "../../../components/layouts/dashboard";
import { getUser } from "../../../middleware/utils";
import { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import DataTable from 'react-data-table-component';
import { Container } from 'react-bootstrap';
import Head from 'next/head'
import ButtonEdit from '../../../components/parts/general/atoms/buttons/btnEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonDelete from '../../../components/parts/general/atoms/buttons/btnDelete';
import React from 'react';
import VerticalCenteredModal from '../../../components/parts/general/molecules/modals/verticalCenteredModal';
import { JsonResponse } from '../../api/global';
import FormStatus from '../../../components/parts/general/atoms/status/formStatus';
import Link from 'next/link'

type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
    deleted_at?: string
}

export default function Index() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(25) 

    const [showModalDelete, setShowModalDelete] = useState(false)
    const [toDeleteId, setToDeleteId] = useState('0')
    const [user, setUser] = useState<User>()

    const [status, setStatus] = useState("success")
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        setUser(data.find(obj => obj.id === toDeleteId))
        return () => {
            setUser(null)
        }
    }, [toDeleteId, data])

    const columns = [
        {
            name: 'Nama Depan',
            selector: row => row.first_name,
            sortable: true
        },
        {
            name: 'Nama Belakang',
            selector: row => row.last_name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Tanggal Daftar',
            selector: row => new Date(row.created_at).toLocaleString(),
            sortable: true
        },
        {
            name: 'Aksi',
            cell: (row) => (
                <div className="d-flex">
                    <ButtonEdit href={`/dashboard/users/edit/${row.id}`} BtnType="link" className="btn-sm">
                        <FontAwesomeIcon icon={faEdit} />
                    </ButtonEdit>
                    <ButtonDelete className="btn-sm ms-2" id={row.id} onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </ButtonDelete>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ]

    const fetchData = async (page?: Number, pageSize?: Number) => {
        setLoading(true)
        try {
            const res = await axios.get(`${backendUrl}/user?page=${page ? page : 0}&page_size=${pageSize ? pageSize : 25}`)    
            
            if (res.data) {
                const {data} = res.data
                // console.log(data)
                setData(data)
                // setRowsPerPage(pageSize)
            }
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = (e) => {
        e.preventDefault()
        setShowModalDelete(true)
        setToDeleteId(e.target.id)
    }

    const handleConfirmDelete = async () => {
        try {
            const res: AxiosResponse<JsonResponse> = await axios.delete(`${backendUrl}/user/del/${toDeleteId}`)

            if (res.data) {
                setMessage(`User berhasil dihapus`)
                setShow(true)
                setStatus("success")

                const filteredData = data.filter(obj => obj.id !== toDeleteId)
                setData(filteredData)
            } 
        } catch(e) {
            setMessage(e.response)
            setShow(true)
            setStatus("error")
        } finally {
            setShowModalDelete(false)
        }
    }

    return (
        <DashboardLayout>
            <Head>
                <title>Manajemen User</title>
            </Head>
            <Container>
                <div className="content-admin">
                    <h2 className="mb-4">Manajemen User</h2>
                    <div className="rounded-3 p-3 bg-white shadow">
                    <FormStatus message={message} show={show} status={status} />
                        <div className="d-flex justify-content-end mb-2">
                            <Link href="/dashboard/users/create">
                                <a className="btn btn-sm fw-bold btn-zy-success">
                                    <FontAwesomeIcon icon={faPlus} className='me-2' />
                                    Tambah
                                </a>
                            </Link>
                        </div>
                        <DataTable
                            noHeader={true}
                            theme="default"
                            columns={columns} 
                            data={data} 
                            progressPending={loading} 
                            pagination={true}
                            defaultSortFieldId={1}
                            highlightOnHover
		                    pointerOnHover
                            // paginationTotalRows={rowsPerPage}
                        />
                    </div>
                </div>
            </Container>
            <VerticalCenteredModal 
                onHide={() => setShowModalDelete(false)} 
                show={showModalDelete} 
                title="Hapus User" 
                onConfirm={handleConfirmDelete}
            >
                Apakah anda yakin untuk menghapus user {user ? user.first_name : ''}
            </VerticalCenteredModal>
        </DashboardLayout>
    )
}

// export async function getServerSideProps(context) {
//     const { req } = context
//     let user = null
//     try {
//         user = await getUser(req)
//     } catch (e) {
//         console.log(e)
//     }

//     if (!user) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }

//     return {
//         props: {
//         }, // will be passed to the page component as props
//     }
// }