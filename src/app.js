import './public.css'
import './reset.css'

import './style.css'

import Logo from './asset/muit_logo.png'

import * as pb from './util/pagebuilder'

import { get_homepage_content } from './util/request'

import pages from './util/router'

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

document.body.appendChild(header)

// Set up nav
const nav = pb.nav_factory()

pages.forEach(page => {
    const a = document.createElement('a')
    a.href = page.link

    a.appendChild(pb.navItem_factory(page.name))

    nav.appendChild(a)
})

document.body.appendChild(nav)

// Set up primary content
const main = pb.main_factory()

const primary_content = pb.primary_content_factory()

main.appendChild(pb.paragraph_factory('Home', 'maintitle'))

const get_content_request = get_homepage_content()

get_content_request.then(response => {
    const data = response.data

    primary_content.appendChild(pb.paragraph_factory('News:', 'home_subtitle'))

    data.news.forEach(news => {
        const p = document.createElement('p')

        p.className = "news_content"

        const label = document.createElement('span')

        label.innerText = `${news.type ? news.type : ''}`
        label.className = 'news_label'

        p.appendChild(label)

        p.innerHTML += ' ' + news.content

        primary_content.appendChild(p)

        news.images.forEach(img => {
            const image = document.createElement('img')

            image.src = './data/home/images/' + img
            image.style.width = '96%'
            image.style.marginLeft = '2%'

            primary_content.appendChild(image)
        })
    })
})

main.appendChild(primary_content)

document.body.appendChild(main)