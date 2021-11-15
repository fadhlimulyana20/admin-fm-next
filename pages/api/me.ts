import axios, { AxiosResponse } from "axios";
import cookie from 'cookie'
import { backendUrl } from "../../components/prefix/backend";
import { getAppCookies } from "../../middleware/utils";
import { JsonResponse } from "./global";

export default async function Me(req, res) {
    console.log(backendUrl)
    if (req.method === "GET") {
        const { token } = getAppCookies(req);
        try {
            const response: AxiosResponse<JsonResponse> = await axios.get(`${backendUrl}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data) {
                const { data } = response.data
                
                return res.status(200).json({
                    status: 200,
                    data: data
                })
            }
        }catch(err) {
            const { response } = err
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