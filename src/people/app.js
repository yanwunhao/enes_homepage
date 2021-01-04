import '../public.css'
import '../reset.css'

import './style.css'

import Logo from '../asset/muit_logo.png'

import { get_faculty_list, get_administrative_list } from '../util/request'

import * as pb from '../util/pagebuilder'

// Set up header
const header = pb.header_factory()

const title = pb.paragraph_factory('Welcome to Emerging Networks and Systems Laboratory (ENeS)', 'title')

const logo = pb.image_factory_by_id(Logo, 'muit_logo')

header.appendChild(logo)

header.appendChild(title)

document.body.appendChild(header)

// Set up primary content
const primary_content = pb.primary_content_factory()

primary_content.appendChild(pb.paragraph_factory('People', 'maintitle'))

primary_content.appendChild(pb.paragraph_factory('Faculty:', 'subtitle'))

const faculty_request = get_faculty_list()

faculty_request.then(response => {
    let datalist = response.data.split('\r\n')

    let item_container = {}

    for (let i = 1; i < datalist.length; i++) {
        const details = datalist[i].split(',')

        item_container.id = details[0]
        item_container.name = details[1]
        item_container.title = details[2].split('/')
        item_container.position = details[3]
        item_container.email = details[4]

        const reg = new RegExp('/', 'g') // replace / in csv to ,
        item_container.interest = details[5].replace(reg, ',')

        let people_item = pb.people_item_factory()

        let image = pb.image_factory_by_classname('/data/list/img/' + item_container.id + '.jpg', 'photo')

        people_item.appendChild(image)

        let people_content = pb.people_content_factory()

        people_content.appendChild(pb.paragraph_factory(item_container.name, 'people_content_name'))

        item_container.title.forEach(item => { people_content.appendChild(pb.paragraph_factory(item, 'people_content_title')) })

        people_content.appendChild(pb.strong_factory('Position:'))
        people_content.appendChild(pb.paragraph_factory(item_container.position, 'people_content_position'))

        people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

        people_content.appendChild(pb.strong_factory('Homepage:'))
        people_content.appendChild(pb.hyperlink_factory('www3.muroran-it.ac.jp/enes/individual.html?id=' + item_container.id, '/individual.html?id=' + item_container.id, 'people_content_homepage'))

        people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

        people_content.appendChild(pb.strong_factory('Email:'))
        people_content.appendChild(pb.paragraph_factory(item_container.email, 'people_content_email'))

        people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

        people_content.appendChild(pb.strong_factory('Research Interests:'))
        people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))
        people_content.appendChild(pb.paragraph_factory(item_container.interest, 'people_content_interest'))

        people_item.appendChild(people_content)

        primary_content.appendChild(people_item)
    }

    primary_content.appendChild(pb.paragraph_factory('Administrative Staff:', 'subtitle'))

    const administrative_request = get_administrative_list()

    administrative_request.then(response => {
        let datalist = response.data.split('\r\n')

        let item_container = {}

        for (let i = 1; i < datalist.length; i++) {
            const details = datalist[i].split(',')

            item_container.id = details[0]
            item_container.name = details[1]
            item_container.title = details[2]
            item_container.email = details[3]

            let people_item = pb.people_item_factory()

            let image = pb.image_factory_by_classname('/data/list/img/' + item_container.id + '.jpg', 'photo')

            people_item.appendChild(image)

            let people_content = pb.people_content_factory()

            people_content.appendChild(pb.paragraph_factory(item_container.name, 'people_content_name'))

            people_content.appendChild(pb.strong_factory('title:'))
            people_content.appendChild(pb.paragraph_factory(item_container.title, 'people_content_position'))

            people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

            people_content.appendChild(pb.strong_factory('Email:'))
            people_content.appendChild(pb.paragraph_factory(item_container.email, 'people_content_email'))

            people_item.appendChild(people_content)

            primary_content.appendChild(people_item)
        }
    })
})

document.body.appendChild(primary_content)