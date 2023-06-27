// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

//Clean Body
document.body.textContent = ''

// create header
const header = `<header id="header">
<h1 id="title"><span>&#128506;</span>JavaScript in The Wild LOCATOR APP </h1>
<button id="find-me" class="find-me">Where Am I</button>
</header>`

// create coords container
const coordsContainer = `<div class ='coords'>

<a id="map-link" target="_blank"></a>
</div>`
// < p id = "status" ></>
//Append header to the body
document.body.innerHTML = header
document.body.innerHTML += coordsContainer


// Your Code Here.
let latitudeCoord, longitudeCoord

function success(position) {

    const coords = position.coords
    latitudeCoord = coords.latitude
    longitudeCoord = coords.longitude

    const page1 = getData(latitudeCoord, longitudeCoord)
    // console.log(page1)
 
     
}


function error() {
    alert("Sorry, no position available.");
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
};


navigator.geolocation.getCurrentPosition(success, error, options)



document.querySelector("#find-me").addEventListener("click", () => {
    const mapLink = document.querySelector("#map-link");
    mapLink.textContent = `Latitude: ${latitudeCoord} °, Longitude: ${longitudeCoord} °`;

});


const getData = async function (lat, lon) {

    const apiKey = "b2cfde4baf7b243140c2a6e2d2c9940c";

    const myResponse = await fetch(`https://www.flickr.com/services/rest/?api_key=${apiKey}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${lat}&lon=${lon}`)

        .then((response) => {

            if (response.status !== 200) {
                throw new Error('Cannot Either Fecth Data or Get Your Coords')
            }
            const newResponse = response.json()
     
            return newResponse
        })

        .then((result) => {
        
            renderImages(result)
        })

    return myResponse
}

function imageUrl(page, num) {
 
    return `https://live.staticflickr.com/${page.photos.photo[num].server}/${page.photos.photo[num].id}_${page.photos.photo[num].secret}_c.jpg`
}

function renderImages(promise){
    
    const imagesStock = document.createElement('section')
    imagesStock.className = "images-stock"
    const imagesDivSlide = document.createElement('div')
    imagesDivSlide.setAttribute('class', 'imagesContainer')

    for(let i = 0; i < promise.photos.photo.length; i++){
        const image = imageUrl(promise, i)
        const imgHtmlTag = document.createElement('img')
        imgHtmlTag.setAttribute('style', 'width: 700px; height: 350px')
        imgHtmlTag.style.minWidth = '700px'
        imgHtmlTag.src = image
        imagesDivSlide.append(imgHtmlTag)

    }
    imagesStock.append(imagesDivSlide)
    document.body.append(imagesStock)
    updateImage()

}
let currentImage = 1
let myInterval;
function updateImage (){

    const allImages = document.querySelectorAll('img')
    if (currentImage > allImages.length ) {
        currentImage = 1
    }else if(currentImage < 1){
        currentImage = allImages.length
    }
    document.querySelector('.imagesContainer').style.transform = `translateX(-${(currentImage -1) * 700}px)`

    if(!myInterval){

        myInterval = setInterval(()=> {
            currentImage++
             updateImage()
        },3000)
    }
    // setInterval(()=> {
    //     currentImage++
    //     updateImage()
    // },3000)
}


// https://live.staticflickr.com/{server-id}/{id}_{o-secret}_o.{o-format}

// #
// # Example
// #   server - id: 7372
// #  photo - id: 12502775644
// #   secret: acfd415fa7
// #   size: w
// #

// https://live.staticflickr.com/7372/12502775644_acfd415fa7_w.jpg

// {
//     "photos": {
//         "page": 1,
//             "pages": 4515,
//                 "perpage": 5,
//                     "total": 22571,
//                         "photo": [
//                             {
//                                 "id": "53001052908",
//                                 "owner": "95302179@N08",
//                                 "secret": "942ecebcba",
//                                 "server": "65535",
//                                 "farm": 66,
//                                 "title": "41",
//                                 "ispublic": 1,
//                                 "isfriend": 0,
//                                 "isfamily": 0
//                             },
//                             {
//                                 "id": "52999978502",
//                                 "owner": "95302179@N08",
//                                 "secret": "de47c68505",
//                                 "server": "65535",
//                                 "farm": 66,
//                                 "title": "40",
//                                 "ispublic": 1,
//                                 "isfriend": 0,
//                                 "isfamily": 0
//                             },
//                             {
//                                 "id": "52976975093",
//                                 "owner": "33712242@N00",
//                                 "secret": "df97efa559",
//                                 "server": "65535",
//                                 "farm": 66,
//                                 "title": "Former Gimbels Langhorne",
//                                 "ispublic": 1,
//                                 "isfriend": 0,
//                                 "isfamily": 0
//                             },
//                             {
//                                 "id": "52950302625",
//                                 "owner": "95302179@N08",
//                                 "secret": "7d9b048139",
//                                 "server": "65535",
//                                 "farm": 66,
//                                 "title": "dji_fly_20230604_081438_448_1685881120618_photo",
//                                 "ispublic": 1,
//                                 "isfriend": 0,
//                                 "isfamily": 0
//                             },
//                             {
//                                 "id": "52950302605",
//                                 "owner": "95302179@N08",
//                                 "secret": "a6982a2066",
//                                 "server": "65535",
//                                 "farm": 66,
//                                 "title": "dji_fly_20230604_081644_451_1685881131450_photo",
//                                 "ispublic": 1,
//                                 "isfriend": 0,
//                                 "isfamily": 0
//                             }
//                         ]
//     },
//     "stat": "ok"
// }