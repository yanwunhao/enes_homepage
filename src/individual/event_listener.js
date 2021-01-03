import {
    get_biography_details_asyncxhr,
    get_publications_details_asyncxhr, get_activities_details_asyncxhr,
    get_teaching_details_asyncxhr, get_awards_details_asyncxhr
} from '../util/request'

import * as pb from '../util/pagebuilder'

export function enes_event_listener(id, event_name) {
    if (event_name === 'Biography') {
        const request = get_biography_details_asyncxhr(id)
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            page_content.push(pb.paragraph_factory(data.intro, 'bio_intro'))

            data.experiences.forEach(exp => {
                const exp_div = pb.div_factory("bio_exp")

                const logo = document.createElement('img')
                logo.src = './data/individuals/' + id + '/image/' + exp.logo
                logo.className = 'bio_exp_logo'
                exp_div.appendChild(logo)

                const exp_detail_div = pb.div_factory("bio_exp_details")
                exp_detail_div.appendChild(pb.paragraph_factory(exp.title + ', ' + exp.time, ''))
                if (exp.department) {
                    exp_detail_div.appendChild(pb.paragraph_factory(exp.department, ''))
                }
                exp_detail_div.appendChild(pb.paragraph_factory(exp.belonging))
                exp_detail_div.appendChild(pb.paragraph_factory(exp.address))
                exp_div.appendChild(exp_detail_div)

                page_content.push(exp_div)
            })

            return page_content
        }
    }
    else if (event_name === 'Publications') {
        const request = get_publications_details_asyncxhr(id)
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            data.catagory.forEach(element => {
                const title = pb.paragraph_factory(element.name, 'list_title')
                page_content.push(title)

                const ul = pb.ul_factory('list')
                element.content.forEach(item => {
                    ul.appendChild(pb.li_factory(`${item.author}, <a href=
                    ${item.link ? item.link : ''}>${item.title}</a>, <em>${item.medium}</em>, ${item.remark}${item.award ? ', ' : ''} <font color="red">
                    ${item.award ? item.award : ''}</font>`, 'item'))
                })
                page_content.push(ul)
            })

            return page_content
        }
    }
    else if (event_name === 'Professional Activities') {
        const request = get_activities_details_asyncxhr(id)
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            data.catagory.forEach(element => {
                const title = pb.paragraph_factory(element.name, 'list_title')
                page_content.push(title)

                const ul = pb.ul_factory('list')
                element.content.forEach(item => {
                    ul.appendChild(pb.li_factory(item, 'item'))
                })
                page_content.push(ul)
            })

            return page_content
        }
    }
    else if (event_name === 'Supervision') {
        return 'People'
    }
    else if (event_name === 'Teaching') {
        const request = get_teaching_details_asyncxhr(id)
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            data.catagory.forEach(element => {
                const year = pb.paragraph_factory(element.year, 'list_title')
                page_content.push(year)

                const ul = pb.ul_factory('list')
                element.list.forEach(item => {
                    ul.appendChild(pb.li_factory(item, 'item'))
                })
                page_content.push(ul)
            })

            return page_content
        }
    }
    else if (event_name === 'Awards') {
        const request = get_awards_details_asyncxhr(id)
        request.send(null)
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)

            const page_content = []

            data.catagory.forEach(element => {
                if (element.name) {
                    const title = pb.paragraph_factory(element.name, 'list_title')
                    page_content.push(title)
                }

                const ul = pb.ul_factory('list')
                element.content.forEach(item => {
                    ul.appendChild(pb.li_factory(`${item.name}, <em>${item.org}</em>, ${item.year}`, 'item'))
                })
                page_content.push(ul)
            })

            return page_content
        }
    }
}