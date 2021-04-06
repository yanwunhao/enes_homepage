import '../public.css'
import '../reset.css'

import '../style.css'

import Logo from '../asset/muit_logo.png'
import Logo_Footer from '../asset/muit_logo_footer.png'

import * as pb from '../util/pagebuilder'

import pages from '../util/router'

import { get_footer_info, get_video_catalog } from '../util/request'

// Set up body
const body_content = pb.body_content_factory()
document.body.appendChild(body_content)

// Set up header
const header = pb.header_factory()

const top_border = pb.div_factory('top_border')
header.appendChild(top_border)

const title = pb.paragraph_factory('Welcome to Emerging Networks and Systems Laboratory (ENeS)', 'title')

const a_title = pb.hyperlink_factory('', './index.html', 'a_title')
a_title.appendChild(title)

const logo = pb.image_factory_by_id(Logo, 'muit_logo')

const a_logo = pb.hyperlink_factory('', 'http://www.muroran-it.ac.jp/en/', '')
a_logo.appendChild(logo)

header.appendChild(a_logo)

header.appendChild(a_title)

body_content.appendChild(header)

// Set up nav
const local_page = 'Video'

const nav = pb.nav_factory()

pages.forEach(page => {
    const a = document.createElement('a')
    a.href = page.link

    if (page.name === local_page) {
        const h2_item = document.createElement('h2')
        h2_item.innerText = page.name
        h2_item.style.borderBottom = '1px solid #c1c1c1'
        a.appendChild(h2_item)
    } else {
        a.appendChild(pb.navItem_factory(page.name))
    }

    nav.appendChild(a)
})

body_content.appendChild(nav)

// Set footer info
const footer_content = pb.footer_content_factory()

const footer_request = get_footer_info()

footer_request.send(null)

if (footer_request.status === 200) {
    const datalist = footer_request.responseText.split('\r\n')

    const data = datalist[1].split(',')

    footer_content.appendChild(pb.paragraph_factory(data[0], ''))
    footer_content.appendChild(pb.paragraph_factory(data[1], ''))

    const reg = new RegExp('/', 'g') // replace / in csv to ,
    footer_content.appendChild(pb.paragraph_factory(data[2].replace(reg, ', '), ''))

    footer_content.appendChild(pb.paragraph_factory('Email: ' + data[3], ''))
    footer_content.appendChild(pb.paragraph_factory('Tel: ' + data[4], ''))
    footer_content.appendChild(pb.paragraph_factory('Fax: ' + data[5], ''))

    footer_content.appendChild(pb.paragraph_factory('<a href="../index.html">ENeS Lab</a> | <a href="http://www.muroran-it.ac.jp/en/link_d/d_iee.html" target="_blank">Department of IEE</a> | <a href="http://www.muroran-it.ac.jp/en/" target="_blank">Muroran IT</a>', ''))

    const footer_logo = new Image()

    footer_logo.src = Logo_Footer

    footer_logo.id = 'footer_logo'

    footer_content.appendChild(footer_logo)
}

// Set up primary content
const main = pb.main_factory()

const primary_content = pb.primary_content_factory()

main.appendChild(pb.paragraph_factory('Video', 'maintitle'))

const get_content_request = get_video_catalog()

get_content_request.then(response => {
    const datalist = response.data.split('\r\n')

    const activity_box = document.createElement('div')

    activity_box.id = 'activity_box'

    activity_box.appendChild(pb.paragraph_factory('Our Activities:', 'home_subtitle'))

    const research_box = document.createElement('div')

    research_box.id = 'research_box'

    research_box.appendChild(pb.paragraph_factory('Our Researches:', 'home_subtitle'))

    datalist.forEach(data => {
        const data_item = data.split(',')
        const filename = data_item[0]
        const type = data_item[1]

        const video = document.createElement('video')
        video.controls = 'controls'
        video.style.width = '94%'
        video.style.marginLeft = '3%'

        const source = document.createElement('source')
        source.src = './data/video/source/' + filename
        source.type = 'video/mp4'

        video.appendChild(source)

        if (type === 'activity') {
            activity_box.appendChild(video)
        } else if (type === 'research') {
            research_box.appendChild(video)
        } else {
            console.log('no catagory')
        }
    })

    primary_content.appendChild(activity_box)
    primary_content.appendChild(research_box)
})

main.appendChild(primary_content)
main.appendChild(footer_content)

body_content.appendChild(main)