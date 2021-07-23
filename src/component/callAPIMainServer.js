import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function callAPIMainServer(enpoint, method = 'GET', paramObj, body) {

    let token = AsyncStorage.getItem('TOKEN');
    console.log(token)
    return axios({
           // headers: { Authorization: `Bearer ${token}` },
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTMOqIFbEg24gQW4iLCJwaG9uZSI6IjA5NDM0MTc5MTciLCJyb2xlIjoiTWVtYmVyIiwianRpIjoiODYzMzk0ZTItMGQwOS00Y2RhLTlhZDItNDk4MTJlZGNmMjFkIiwiZXhwIjoxNjMyOTQwMjg5LCJpc3MiOiJCYW9CYW9TaG9wLmxpdmUiLCJhdWQiOiJGb3JVc2VyTG9naW5lZCJ9.cvc-Ol9XPkfMxfUsIi2ZvnZ1U8yC91PjESKD5mEGrxw` },
        method: method,
        url: `https://baobaoshop.live/api/${enpoint}`,
        params: paramObj,
        data: body
    })
}