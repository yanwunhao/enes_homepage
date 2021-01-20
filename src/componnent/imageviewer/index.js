import './style.css'

const imageViewer = document.createElement('div')

// const closeBtn = document.createElement('span')
// closeBtn.id = 'closeBtn'
// closeBtn.innerText = 'X'
// closeBtn.addEventListener('click', () => {
//     imageViewer.style.display = 'none'
// })

// imageViewer.appendChild(closeBtn)

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