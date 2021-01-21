import './style.css'

const imageViewer = document.createElement('div')

const message = document.createElement('span')
message.id = 'imageviewer_message'
message.innerText = 'ENeS ImageViewer'
imageViewer.appendChild(message)

const img = document.createElement('img')
img.id = 'image'
imageViewer.appendChild(img)

imageViewer.changeImgSrc = function (url) {
    img.src = url
}

imageViewer.id = 'imageViewer'

export default imageViewer