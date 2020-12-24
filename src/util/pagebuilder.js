export function header_factory() {
    const element = document.createElement('div')

    element.id = 'header'

    return element
}

export function primary_content_factory() {
    const element = document.createElement('div')

    element.id = 'primary_content'

    return element
}

export function people_item_factory() {
    const element = document.createElement('div')

    element.className = 'people_item'

    return element
}

export function people_content_factory() {
    const element = document.createElement('div')

    element.className = 'people_content'

    return element
}

export function image_factory_by_id(img, id) {
    const image = new Image()
    image.src = img
    image.id = id

    return image
}

export function image_factory_by_classname(img, class_name) {
    const image = new Image()
    image.src = img
    image.className = class_name

    return image
}

export function image_factory_base64(img_code, class_name) {
    const image = new Image()
    image.src = "data:image/gif;base64," + img_code

    img.className = class_name

    return image
}

export function strong_factory(content) {
    const strong = document.createElement('strong')

    strong.innerText = content

    return strong
}

export function paragraph_factory(content, class_name) {
    const title = document.createElement('p')

    title.innerText = content

    title.className = class_name

    return title
}

export function hyperlink_factory(content, url, class_name) {
    const hyperlink = document.createElement('a')

    hyperlink.innerHTML = content

    hyperlink.href = url

    hyperlink.className = class_name

    return hyperlink
}