
import './css/styles.css';
import Notiflix from 'notiflix';
import API from './fetchCountries';

debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    listEl:document.querySelector('.country-list'),
    infoEl:document.querySelector('.country-info'),
};

const clearCountryInfoContainers = () => {
    refs.listEl.innerHTML = '';
    refs.infoEl.innerHTML = '';
  };

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e){
    e.preventDefault();
    
    const searchQuery = e.target.value.trim();
    
    if (!searchQuery) return;

    API.fetchCountries(searchQuery)
    .then(resolve => {
        if (resolve.length === 1) { 
            clearCountryInfoContainers();
            countryInfo(resolve);
           return;
        }
        else if (resolve.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
          }
          else  if (resolve.length > 1) {
             clearCountryInfoContainers();
             countriesList(resolve);       
             return;
         }
    })
    .catch(error => (Notiflix.Notify.failure('Oops, there is no country with that name')))
    .finally(() => setTimeout(() => {e.target.value = ""}, 1000));
}

function countryInfo(countries) {
    const country = countries[0];
    const info = `<div class="country-info__box" alt="flag">
              <img src="${country.flags.png}" width="50">
              <span class="country-info__name">${country.name.official}</span>
              </div>
              <p class="country-text"><span class="country-info--accent">Capital:</span> ${
                country.capital
              }</p>
              <p class="country-text"><span class="country-info--accent">Population:</span> ${
                country.population
              }</p>
              <p class="country-text"><span class="country-info--accent">Languages:</span> ${Object.values(
                country.languages
              ).join(', ')}</p>`;
  
    refs.infoEl.insertAdjacentHTML('beforeend', info);
  };


function countriesList(countries) {
  const countriesList = countries.map(country => {
      return `<li class="country-list__item">
              <img src="${country.flags.svg}" width="50" alt="flag">
              <span class="country-list__name">${country.name.official}</span>
          </li>`;
   });
  countriesList.forEach(markupCountry => {
      refs.listEl.insertAdjacentHTML('beforeend', markupCountry);
   });
  };
