import axios from 'axios';

export default function callAPIMainServer(token, enpoint, method = 'GET', paramObj, body) {
    return axios({
        headers: { Authorization: `Bearer ${token}` },
        method: method,
        url: `https://baobaoshop.live/api/${enpoint}`,
        params: paramObj,
        data: body
    })
}