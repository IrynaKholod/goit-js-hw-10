const URL = 'https://restcountries.com/v3.1/name/';
const filter = '?field=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${URL}${name}${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetchCountries };