// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.

//strore images
const images = []

const section = document.createElement('section');
section.className = 'images-stock'

//Clean Body
document.body.textContent = ''

// create header
const header = `<header id="header">
<h1 id="title">JavaScript in The Wild Locator App </h1>
<button id="find-me" class="find-me">Locator</button>
</header>`

// create coords container
const coordsContainer = `<div class ='coords'>
<a id="map-link" target="_blank"></a>
</div>`

//Append header,coordsContainer and instruction message to the body
document.body.innerHTML = header
document.body.innerHTML += coordsContainer

//Get coords latitude and longitude with google geolocation api
let latitudeCoord, longitudeCoord

function success(position) {

    const coords = position.coords
    latitudeCoord = coords.latitude
    longitudeCoord = coords.longitude

    getSomeData(latitudeCoord, longitudeCoord)
}

function error() {
    alert("Sorry, no position available.");
}

const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 5000,
};

navigator.geolocation.getCurrentPosition(success, error, options)


//Get data from flickr api based on our geolocation 
const getSomeData = async function (lat, lon) {

    const apiKey = "b2cfde4baf7b243140c2a6e2d2c9940c";

    const myResponse = await fetch(`https://www.flickr.com/services/rest/?api_key=${apiKey}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${lat}&lon=${lon}&text=bridge&page=1`)
        .then((response) => {

            if (response.status !== 200) {
                throw new Error('Cannot Either Fecth Data or Get Your Coords')
            }
            const newResponse = response.json()
            return newResponse
        })
        .then((result) => {
            stockImages(result)
        })

    return myResponse
}

//build image url
function imageUrlConstruction(apiResult, num) {

    return `https://live.staticflickr.com/${apiResult.photos.photo[num].server}/${apiResult.photos.photo[num].id}_${apiResult.photos.photo[num].secret}_c.jpg`
}

//create Html image tags in according to our api Response and div and set their source to be images url  that we have created by using imageUrlConstruction function 

function stockImages(dataFetched) {

    for (let i = 0; i < dataFetched.photos.photo.length; i++) {
        const newImageUrl = imageUrlConstruction(dataFetched, i)
        const newImage = document.createElement('img')
        newImage.setAttribute('style', 'width: 100%; height: 100%')
        newImage.src = newImageUrl
        images.push(newImage)
    }
 
    // Display coords and photos to the screen when pressing the button named Locator 
    document.querySelector("#find-me").addEventListener("click", () => {
        section.append(images[0])
        render(images)

        const coordsDisplay = document.querySelector("#map-link");
        coordsDisplay.textContent = `Latitude: ${latitudeCoord} °, Longitude: ${longitudeCoord} °`;

        section.style.display = 'flex';

        document.querySelector('.coords').style.visibility = 'visible';
        document.body.append(section)

    });
    
    return images
}

// display images
let changeImageInterval;
let actualImage = 1;

function render(image) {

if (actualImage < image.length){
    
    if (changeImageInterval !== null) {
        clearInterval(changeImageInterval)
       
        changeImageInterval = setInterval(() => {
            section.textContent = ''
            section.append(image[actualImage])
            actualImage++
            render(image)
        }, 3000)

    }
}else{
    clearInterval(changeImageInterval)
    actualImage = 0;
    render(image)
}

}
