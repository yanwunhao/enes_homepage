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

export function get_individual_catalog(usr_id) {
    const request = axios({
        url: './data/individuals/' + usr_id + '/catalog.csv'
    })

    return request
}

export function get_publications_details_asyncxhr(usr_id) {
    const request = new XMLHttpRequest()
    request.open('GET', './data/individuals/' + usr_id + '/content/publications.json', false)

    return request
}

export function get_activities_details_asyncxhr(usr_id) {
    const request = new XMLHttpRequest()
    request.open('GET', './data/individuals/' + usr_id + '/content/activities.json', false)

    return request
}

export function get_teaching_details_asyncxhr(usr_id) {
    const request = new XMLHttpRequest()
    request.open('GET', './data/individuals/' + usr_id + '/content/teaching.json', false)

    return request
}

export function get_awards_details_asyncxhr(usr_id) {
    const request = new XMLHttpRequest()
    request.open('GET', './data/individuals/' + usr_id + '/content/awards.json', false)

    return request
}