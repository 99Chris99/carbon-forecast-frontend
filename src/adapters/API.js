const apiEndpoint = `https://api.carbonintensity.org.uk/`
const nationalURL = `${apiEndpoint}intensity/`
const allRegionsURL = `${apiEndpoint}regional/`
const region48Hrs = `${allRegionsURL}intensity/`
const id48Hrs = `${allRegionsURL}intensity/{from}/fw48h/regionid/`

const handleErrors = (response) => {
    if (!response.ok) {
        console.log('run for your lives its an error!!!')
        throw Error(response.statusText);
    }
    return response;
}

const getCurrentNationalData = () => fetch(nationalURL,{method: "GET"}).then(handleErrors).then(response => response.json())
const getCurrentRegionalData = () => fetch(allRegionsURL,{method: "GET"}).then(handleErrors).then(response => response.json())
const getRegionId48HrsData = (idQuery, start) => fetch(`${region48Hrs}${start}/fw48h/regionid/${idQuery}`,{method: "GET"}).then(handleErrors).then(response => response.json())
const getRegionPostCode48HrsData = (postCodeQuery, start) => fetch(`${region48Hrs}${start}/fw48h/postcode/${postCodeQuery}`,{method: "GET"}).then(handleErrors).then(response => response.json())



export default {
    getCurrentNationalData,
    getCurrentRegionalData,
    getRegionId48HrsData,
    getRegionPostCode48HrsData
}