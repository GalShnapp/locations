import axios from "axios"

const positionStackAccessKey = '2057aba91c20db19c5d31813d503c19a'
const positionStackBaseAPIUrl = 'http://api.positionstack.com/v1'
const positionStackEndpoint = 'forward'

const url = `${positionStackBaseAPIUrl}/${positionStackEndpoint}`

export default async function getGeoLocationFromAddress(address) {
    const searchParams = new URLSearchParams();
    searchParams.append("access_key", positionStackAccessKey);
    searchParams.append("query", address)
    return axios.request({
        //url: `${url}?${searchParams.toString()}`,
        url: `${url}?access_key=${positionStackAccessKey}&query=${address}`,
        method: 'GET'
    }).then(resp => {
        const data = resp.data.data[0]
        return [data.latitude, data.longitude]
    })
}