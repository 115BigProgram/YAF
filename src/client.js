import axios from "axios"
import qs from "qs"

const baseUrl = "http://47.103.217.165:8787/"

export const client = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    transformRequest: [(data, headers) => {
        return qs.stringify(data)
    }]
})

export function handleResponse(res) {
    if (res.data.code != 0 || res.data.msg != null) {
        console.log(res)
        throw res.data
    }
    return res.data.data
}

export function handleErr(err) {
    console.log(err)
    if (err.code !== undefined) {
        return err.code + ":" + err.msg
    }
    return err
}

export default client
