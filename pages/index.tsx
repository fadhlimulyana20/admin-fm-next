import axios from 'axios'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Image from 'next/image'
import { backendUrl } from '../components/prefix/backend'
import { greenBackground } from '../middleware/global'
import { getAppCookies } from '../middleware/utils'
import { useRouter } from 'next/dist/client/router'

export default function Home(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusCode, setStatusCode] = useState(0)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(true)
    axios.post('/api/login', {
      email, password
    }).then(res => {
      const { data, status } = res
      setStatusMessage('Anda berhasil Login')
      setStatusCode(status)
      console.log(res)
      router.push('/dashboard')
    }).catch(err => {
      const { response } = err
      console.log(err)
      setStatusMessage(response.data.message)
      setStatusCode(response.data.status)
    }).finally(() => {
      setSubmit(false)
    })
  }

  return (
    <React.Fragment>
      <div className='bg-zy-success' style={{ minHeight: '100vh' }}>
        <Container className="px-sm-4 px-md-2 px-4">
          <div className="pt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-2 col-5">
                <h1 className='mb-0 fw-bold text-white'>KUADRAN</h1>
                {/* <div className="image-container">
                  <Image src="/logo-700-putih.png" layout="fill" className="image" alt="logo-zyklus" />
                </div> */}
              </div>
            </div>

            <div className="row d-flex justify-content-center pt-5">
              <div className="col-md-4 bg-white rounded-3 shadow py-5 px-4">
                <div className="text-center mb-4">
                  <h2>Masuk Akun</h2>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukan Email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  </Form.Group>
                  <Alert show={statusCode !== 0} variant={statusCode === 200 ? 'success' : 'danger'}>
                    { statusMessage }
                  </Alert>
                  <div className="d-grid pt-3">
                    <Button className='btn-zy-success' variant="white" type="submit" disabled={submit}>
                      {submit ? 'Memproses...' : 'Login'}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}


// export async function getServerSideProps(context) {
//   const { req } = context

//   const { token } = getAppCookies(req);
//   let user = null

//   try {
//     const res = await axios.get(`${backendUrl}/auth/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })

//     if (res.data) {
//       return {
//         redirect: {
//             destination: '/dashboard',
//             permanent: false,
//         },
//       }
//     }
//   } catch (e) {
//     const { response } = e
//     if (response.status === 401) {
//       console.log('Sesi telah habis')
//     } else {
//       console.log(e)
//     }
//   }

//   return {
//     props: {
//       token: token || null,
//       user
//     }, // will be passed to the page component as props
//   }
// }