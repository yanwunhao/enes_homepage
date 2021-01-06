const axios = require('axios')

export function get_homepage_content() {
    const request = axios({
        url: './data/home/homepage.json'
    })

    return request
}

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

export function get_currentstudents_list() {
    const request = axios({
        url: './data/list/currentstudents.csv'
    })

    return request
}