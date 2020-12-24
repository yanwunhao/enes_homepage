const axios = require('axios')

export function get_faculty_list() {
    const request = axios({
        url: './data/faculty.csv'
    })

    return request
}