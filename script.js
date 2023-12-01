const input = document.getElementById('input-pesquisa')
const btn = document.getElementById('btnPesquisa')
const ip = document.getElementById('ip')
const locationH = document.getElementById('location')
const timezone = document.getElementById('timezone')
const isp = document.getElementById('isp')

const mapa = L.map('mapa')
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa)
const icone = L.icon({
    iconUrl: "./images/icon-location.svg"
})
const marcador = L.marker([0, 0], { icon: icone }).addTo(mapa);


function setInfos (start) {
    mapa.setView([start.location.lat, start.location.lng], 13)
    marcador.setLatLng([start.location.lat, start.location.lng])
    ip.innerText = start.ip
    locationH.innerText = `${start.location.city}, ${start.location.country} ${start.location.postalCode}`
    timezone.innerText = `UTC${start.location.timezone}`
    isp.innerText = start.isp
}


async function getGeo(input) {
    const geo = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_tnW0jvYkzbKWCZmwjZHRKMssbKvaZ&ipAddress=${input}&domain=${input}`).then(res => res.json())
    setInfos(geo)
}


document.addEventListener('DOMContentLoaded', async () => {
    const geo = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_tnW0jvYkzbKWCZmwjZHRKMssbKvaZ').then(res => res.json())
    setInfos(geo)
})

btn.addEventListener('click', () => {
    getGeo(input.value)
})