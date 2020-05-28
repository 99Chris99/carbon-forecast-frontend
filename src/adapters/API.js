const apiEndpoint = `https://api.carbonintensity.org.uk/`
const nationalURL = `${apiEndpoint}intensity/`
const allRegionsURL = `${apiEndpoint}regional/`
const region48Hrs = `${allRegionsURL}intensity/`
//const id48Hrs = `${allRegionsURL}intensity/{from}/fw48h/regionid/`

let handleErrors = (response) => {
   // console.log('hihi')
    console.log(response.status)
    if (response.status < 200 || response.status > 299) {
    //if (!response.ok) {
    //if (response !== 200) {
        console.log('run for your lives its an error!!!')
       return alert('Error retrieving forecast data, please reload.')
        // throw Error(response.statusText, reload());
    }
    //console.log('All good')
    return response;
}

const reload = () => {
    alert('Error retrieving forecast data, please reload.')
}

const getCurrentNationalData = () => fetch(nationalURL,{method: "GET"}).then(handleErrors).then(response => response.json()).catch((err) => {
    console.log('Catch error')
  })
const getCurrentRegionalData = () => fetch(allRegionsURL,{method: "GET"}).then(handleErrors).then(response => response.json()).catch((err) => {
    console.log('Catch error')
  })
const getRegionId48HrsData = (idQuery, start) => fetch(`${region48Hrs}${start}/fw48h/regionid/${idQuery}`,{method: "GET"}).then(handleErrors).then(response => response.json()).catch((err) => {
    console.log('Catch error')
  })
const getRegionPostCode48HrsData = (postCodeQuery, start) => fetch(`${region48Hrs}${start}/fw48h/postcode/${postCodeQuery}`,{method: "GET"}).then(handleErrors).then(response => response.json()).catch((err) => {
    console.log('Catch error')
  })



export default {
    getCurrentNationalData,
    getCurrentRegionalData,
    getRegionId48HrsData,
    getRegionPostCode48HrsData
}