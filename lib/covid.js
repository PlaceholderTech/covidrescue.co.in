export const getCovidData = async () => {
    // let response = await fetch(
    //     `https://api.data.gov.in/resource/cd08e47b-bd70-4efb-8ebc-589344934531?limit=all&api-key=${process.env.GOVT_DATA_API}&format=viz`,
    //     {})

    let response = await fetch(
        `https://www.mohfw.gov.in/data/datanew.json`,
        {}
    )
     
    response = await response.json();
    return response;
};