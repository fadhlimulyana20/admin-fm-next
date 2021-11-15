import axios, { AxiosResponse } from "axios";
import cookie from 'cookie'
import { backendUrl } from "../../middleware/global"
import { JsonResponse } from "./global";

export default async function Login(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Email atau Password harus diisi.'
            })
        }

        try {
            const response: AxiosResponse<JsonResponse>= await axios.post(`${backendUrl}/auth/login`, {
                email,
                password
            })

            if (response.data) {
                const { data } = response.data
                
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", data.token, {
                        httpOnly: false,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60*60,
                        sameSite: "strict",
                        path: "/",
                    })
                )
                
                return res.status(200).json({
                    status: 200,
                    data: {
                        token: data.token
                    }
                })
            }
        }catch(err) {
            const { response } = err
            console.log(err)
            if (response) {
                return res.status(response.status).json({
                    status: response.data.status,
                    message: response.data.message
                })
            }

            return res.status(500).json({
                status: 500,
                message: err
            })
        }
    }
}