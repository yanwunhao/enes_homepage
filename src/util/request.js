const axios = require('axios')

export function get_faculty_list() {
    const request = axios({
        url: './data/list/faculty.csv'
    })

    return request
}

export function get_administrative_list() {
    const request = axios({
        url: './data/list/administrative.csv'
    })

    return request
}

export function get_individual_details(usr_id) {
    const request = axios({
        url: './data/individuals/' + usr_id + '/catalog.csv'
    })

    return request
}