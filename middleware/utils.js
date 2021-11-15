import axios from "axios";
import { backendUrl } from "../components/prefix/backend";

export function getAppCookies(req) {
    const parsedItems = {};
    if (req.headers.cookie) {
        const cookiesItems = req.headers.cookie.split('; ');
        cookiesItems.forEach(cookies => {
            const parsedItem = cookies.split('=');
            parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
        });
    }
    return parsedItems;
}

export async function getUser(req) {
    const { token } = getAppCookies(req);
    let user = null

    try {
        const res = await axios.get(`${backendUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        if (res.data) {
            user = res.data
            return user
        }
    } catch (e) {
        console.log(e)
        return user
    }
}
