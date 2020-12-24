const axios = require('axios')

export function get_faculty_list() {
    const request = axios({
        url: './data/faculty.csv'
    })

    return request
}

export function get_administrative_list() {
    const request = axios({
        url: './data/administrative.csv'
    })

    return request
}