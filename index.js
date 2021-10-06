'use strict';

/* Binding The Variables: */
const displayCountryList = document.querySelector('#countries');
const displayCountryName = document.querySelector('#display-country-name');
const chart = document.querySelector('.chart');
const searchButton = document.querySelector('#search-btn');
const inputCountryName = document.querySelector('#search-country-name');
const totalCases = document.querySelector('.total');
const deathCases = document.querySelector('.deaths');
const activeCases = document.querySelector('.active');
const criticalCases = document.querySelector('.critical');
const recoveredCases = document.querySelector('.recovered');
let countryList = [];
let statisticalData = [];

axios
  .get('./country_list.json')
  .then(function (response) {
    // handle success
    // console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      countryList[i] = response.data[i].name;
    }
    // console.log(countryList);
    for (let i = 0; i < countryList.length; i++) {
      const option = document.createElement('option');
      option.textContent = countryList[i];
      option.value = countryList[i];
      displayCountryList.appendChild(option);
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const API = `https://disease.sh/v3/covid-19/countries/${inputCountryName.value}`;
  axios
    .get(API)
    .then((response) => {
      // handle success
      // console.log(response);
      displayCountryName.textContent = inputCountryName.value.toUpperCase();
      totalCases.children[1].textContent = response.data.cases;
      deathCases.children[1].textContent = response.data.deaths;
      activeCases.children[1].textContent = response.data.active;
      criticalCases.children[1].textContent = response.data.critical;
      recoveredCases.children[1].textContent = response.data.recovered;

      statisticalData = [
        response.data.cases,
        response.data.deaths,
        response.data.active,
        response.data.critical,
        response.data.recovered,
      ];
      // console.log(statisticalData);
      drawChart(statisticalData);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
});

const drawChart = (statisticalData) => {
  chart.innerHTML = '';
  const ctx = document.createElement('canvas');
  chart.appendChild(ctx);
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Total Cases',
        'Total Deaths',
        'Total Active',
        'Total Critical',
        'Total Recoverd',
      ],
      datasets: [
        {
          label: inputCountryName.value.toUpperCase(),
          data: statisticalData,
          backgroundColor: ['black', 'black', 'crimson', 'crimson', 'green'],
        },
      ],
    },
    options: {},
  });
};
