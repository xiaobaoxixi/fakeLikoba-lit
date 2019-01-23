import { html, render } from "./node_modules/lit-html/lit-html.js";

// data
const endpoint = "https://5c0aa50a26902800135f6ca4.mockapi.io/";
// skeleton
const skeleton = html`
  <header><h1 class="h2">fake likoba</h1></header>
  <div class="filters"></div>
  <div class="claims"></div>
`;
render(skeleton, document.body);
// elements
const filterContainer = document.querySelector(".filters");
const claimContainer = document.querySelector(".claims");

fetch(endpoint + "claims")
  .then(res => res.json())
  .then(data => {
    render(claimList(data), claimContainer);
  });

const claimList = allClaims => html`
  <div class="claim-list">
    ${
      allClaims.map(
        eachClaim => html`
          <p class="row">
            ${
              Object.keys(eachClaim).map(
                (key, i) =>
                  html`<span class="cell">${Object.values(eachClaim)[i]}</span`
              )
            }
          </p>
        `
      )
    }
  </div>
`;
const filterList = eachFilter =>
  html`
    <p>${eachFilter}</p>
  `;

render(filterList("... filter list ..."), filterContainer);
