import { get_activities_details_asyncxhr } from '../util/request'

import * as pb from '../util/pagebuilder'

export function enes_event_listener(id, event_name) {
    if (event_name === 'Professional Activities') {
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
}