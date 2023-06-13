import type { Country } from "../types/Country"

// export const fetchCountries = () => 
//     fetch('https://restcountries.com/v3.1/region/ame')
//         .then((response) => response.json() as Promise<Country[]>)


export const fetchCountries = () => {
    console.log("Executing fetchCountries");
    return fetch('https://restcountries.com/v3.1/region/ame')
        .then((response) => response.json() as Promise<Country[]>);
};