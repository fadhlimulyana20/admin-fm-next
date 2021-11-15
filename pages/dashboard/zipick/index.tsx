import DashboardLayout from '../../../components/layouts/dashboard';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios, { AxiosResponse } from 'axios';
import { JsonResponse } from '../../../contexts/types';
import { backendUrl } from '../../../middleware/global';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Zipick() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const token = Cookies.get('token')

    const fetchData = async () => {
        setLoading(true)

        try {
            const res: AxiosResponse<JsonResponse> = await axios.get(`${backendUrl}/penjualan_sampah/`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data) {
                console.log(res.data)
                setData(res.data.data)
            }
        }catch(err) {
            console.log(err)
        }finally {
            setLoading(false)
        }
    }

    const columns = [
        {
            name: 'Id User',
            selector: row => row.id_user,
            sortable: true
        },
        {
            name: 'Tanggal Penjemputan',
            selector: row => new Date(row.tanggal).toLocaleString(),
            sortable: true
        },
        // {
        //     name: 'Aksi',
        //     cell: (row) => (
        //         <div className="d-flex">
        //             <ButtonEdit href={`/dashboard/users/edit/${row.id}`} BtnType="link" className="btn-sm">
        //                 <FontAwesomeIcon icon={faEdit} />
        //             </ButtonEdit>
        //             <ButtonDelete className="btn-sm ms-2" id={row.id} onClick={handleDelete}>
        //                 <FontAwesomeIcon icon={faTrash} />
        //             </ButtonDelete>
        //         </div>
        //     ),
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // }
    ]

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <DashboardLayout>
            <Head>
                <title>Manajemn Zipick</title>
            </Head>
            <Container>
                <div className="content-admin">
                    <h2 className="mb-4">Manajemen Zipick</h2>
                    <div className="p-3 rounded-3 shadow bg-white">
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
        </DashboardLayout>
    )
}