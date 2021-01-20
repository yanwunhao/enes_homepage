import '../public.css'
import '../reset.css'

import '../style.css'

import Logo from '../asset/muit_logo.png'

import { get_faculty_list, get_administrative_list, get_currentstudents_list } from '../util/request'

import * as pb from '../util/pagebuilder'

import pages from '../util/router'


// Set up body
const body_content = pb.body_content_factory()
document.body.appendChild(body_content)


// Set up header
const header = pb.header_factory()

const top_border = pb.div_factory('top_border')
header.appendChild(top_border)

const title = pb.paragraph_factory('Welcome to Emerging Networks and Systems Laboratory (ENeS)', 'title')

const a_title = pb.hyperlink_factory('', './indx.html', 'a_title')
a_title.appendChild(title)

const logo = pb.image_factory_by_id(Logo, 'muit_logo')

const a_logo = pb.hyperlink_factory('', 'http://www.muroran-it.ac.jp/en/', '')
a_logo.appendChild(logo)

header.appendChild(a_logo)

header.appendChild(a_title)

body_content.appendChild(header)

// Set up nav
const nav = pb.nav_factory()

pages.forEach(page => {
    const a = document.createElement('a')
    a.href = page.link

    a.appendChild(pb.navItem_factory(page.name))

    nav.appendChild(a)
})

body_content.appendChild(nav)

// Set up primary content
const main = pb.main_factory()

const primary_content = pb.primary_content_factory()

main.appendChild(pb.paragraph_factory('People', 'maintitle'))

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
        item_container.interest = details[5].replace(reg, ', ')

        let people_item = pb.people_item_factory()

        let image = pb.image_factory_by_classname('/data/list/img/' + item_container.id + '.jpg', 'photo')

        people_item.appendChild(image)

        let people_content = pb.people_content_factory()

        people_content.appendChild(pb.paragraph_factory(item_container.name, 'people_content_name'))

        item_container.title.forEach(item => { people_content.appendChild(pb.paragraph_factory(item, 'people_content_title')) })

        people_content.appendChild(pb.strong_factory('Position:'))
        people_content.appendChild(pb.paragraph_factory(item_container.position, 'people_content_position'))

        people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

        people_content.appendChild(pb.strong_factory('Email:'))
        people_content.appendChild(pb.paragraph_factory(item_container.email, 'people_content_email'))
        people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

        if (item_container.homepage) {
            people_content.appendChild(pb.strong_factory('Homepage:'))
            people_content.appendChild(pb.hyperlink_factory(item_container.homepage, item_container.homepage, 'people_content_homepage'))
            people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))
        } else if (item_container.homepage === 'none') {

        } else {
            people_content.appendChild(pb.strong_factory('Homepage:'))
            people_content.appendChild(pb.hyperlink_factory('www3.muroran-it.ac.jp/enes/~' + item_container.id, '/~' + item_container.id, 'people_content_homepage'))
            people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))
        }

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

        primary_content.appendChild(pb.paragraph_factory('Current Students:', 'subtitle'))

        const currentstudents_request = get_currentstudents_list()

        currentstudents_request.then(response => {
            let datalist = response.data.split('\r\n')

            for (let i = 1; i < datalist.length; i++) {
                const details = datalist[i].split(',')

                let item_container = {}

                item_container.id = details[0]
                item_container.from = details[1]
                item_container.visitperiod = details[2]
                item_container.name = details[3]
                item_container.remark = details[4].split('/')
                item_container.title = details[5]
                item_container.email = details[6]
                item_container.homepage = details[7]

                const reg = new RegExp('/', 'g') // replace / in csv to ,
                item_container.interest = details[8].replace(reg, ', ')

                let people_item = pb.people_item_factory()

                let image = pb.image_factory_by_classname('/data/list/img/' + item_container.id + '.jpg', 'photo')

                people_item.appendChild(image)

                let people_content = pb.people_content_factory()

                people_content.appendChild(pb.paragraph_factory(item_container.name, 'people_content_name'))

                item_container.remark.forEach(item => { people_content.appendChild(pb.paragraph_factory(item, 'people_content_title')) })

                people_content.appendChild(pb.strong_factory('Title:'))
                people_content.appendChild(pb.paragraph_factory(item_container.title, 'people_content_position'))
                people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

                if (item_container.from) {
                    people_content.style.lineHeight = '20px'
                    people_content.appendChild(pb.strong_factory('From:'))
                    people_content.appendChild(pb.paragraph_factory(item_container.from, 'people_content_position'))
                    people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))
                }

                people_content.appendChild(pb.strong_factory('Email:'))
                people_content.appendChild(pb.paragraph_factory(item_container.email, 'people_content_email'))
                people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

                if (item_container.homepage && item_container.homepage !== 'none') {
                    people_content.appendChild(pb.strong_factory('Homepage:'))
                    people_content.appendChild(pb.hyperlink_factory(item_container.homepage, item_container.homepage, 'people_content_homepage'))
                    people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))
                } else if ('none' !== item_container.homepage) {
                    people_content.appendChild(pb.strong_factory('Homepage:'))
                    people_content.appendChild(pb.hyperlink_factory('www3.muroran-it.ac.jp/enes/~' + item_container.id, '/~' + item_container.id, 'people_content_homepage'))
                    people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))
                }

                people_content.appendChild(pb.strong_factory('Research Interests:'))
                people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))
                people_content.appendChild(pb.paragraph_factory(item_container.interest, 'people_content_interest'))
                people_content.appendChild(pb.paragraph_factory('', 'people_content_segment'))

                if (item_container.visitperiod) {
                    people_content.appendChild(pb.strong_factory('Visiting Period: ' + item_container.visitperiod))
                }

                people_item.appendChild(people_content)

                primary_content.appendChild(people_item)
            }
        })
    })
})
main.appendChild(primary_content)

body_content.appendChild(main)