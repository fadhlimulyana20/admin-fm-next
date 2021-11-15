import axios, { AxiosResponse } from "axios";
import cookie from 'cookie'
import { backendUrl } from "../../components/prefix/backend"
import { JsonResponse } from "./global";

export default function Logout(req, res) {
    if (req.method === "GET") {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", "", {
                httpOnly: false,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 0,
                sameSite: "strict",
                path: "/",
            })
        )
        return res.status(200).json({
            status: 200,
            message: "Anda telah logout"
        })
    }
}