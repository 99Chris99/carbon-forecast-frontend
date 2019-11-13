import React from 'react';

const fuelMixTitle = [
    
        {
            key: 'fuelMixTitle',
            title: 'Info',
            content: {
                content: (
            <div>
                <p>This chart shows the forecast of the different energy sources that make up the electricity supply for each hour</p>
                <p>The table shows the breakdown by percentage</p>
                <p>Use the controls play or step through every hour</p>
                </div>
            )    
            }
            }
        ]

const forecastSummaryTitle = [
    
        {
            key: 'forecastSummaryTitle',
            title: 'Info',
            content: {
                content: (
            <div>
                <p>This page gives an overview of the Carbon Intensity forecast for the selected period.</p>
                <p>Carbon Intensity is a measure of how much CO2 emissions are produced per kilowatt hour of electricity consumed.
<br></br>- The greater the number, the greater the amount of emissions.
</p>
                <p>Use Top 3 Periods to quickly see the best times (lowest Carbon Intensity) to consume electricity within the given period.
                <br></br>- You can toggle between daytime and nighttime.
</p>
<p>Use Options to see the Carbon Forecast for your home’s electricity supply. Change the region dropdown for a general area, or be specific and enter the first part of your postcode.</p>
    <p>Use the Summary Chart to see the Carbon Intensity Level over time - scroll left and right.</p>
    
    
                </div>
            )    
            }
            }
        ]


  export default {
    fuelMixTitle, forecastSummaryTitle
  }