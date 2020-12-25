import '../public.css'
import '../reset.css'

import Logo from '../asset/muit_logo.png'

import * as pb from '../util/pagebuilder'

import { get_individual_details } from '../util/request'

// Set up header
const header = pb.header_factory()

const title = pb.paragraph_factory('Welcome to Emerging Networks and Systems Laboratory (ENeS)', 'title')

const logo = pb.image_factory_by_id(Logo, 'muit_logo')

header.appendChild(logo)

header.appendChild(title)

document.body.appendChild(header)

// handle parameters from url

const primary_nav = pb.primary_nav_factory()

const parameters = location.search.slice(1).split('=')

if (parameters[0] !== 'id') {
    alert('Parameter is wrong!')
}

const id = parameters[1]

const catalog_request = get_individual_details(id)

catalog_request.then(response => {
    const catalog = response.data.split(',')
    for (let i = 0; i < catalog.length; i++) { }

    document.body.appendChild(primary_nav)
})

