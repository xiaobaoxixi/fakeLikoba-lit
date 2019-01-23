import { html, render } from "./node_modules/lit-html/lit-html.js";

// data
let content;
const dataLink = "https://5c0aa50a26902800135f6ca4.mockapi.io/";
// skeleton
const skeleton = html`
  <header><h1>fake likoba</h1></header>
  <div class="filters"></div>
  <div class="claims"></div>
`;
render(skeleton, document.body);
// elements
const filterContainer = document.querySelector(".filters");
const claimContainer = document.querySelector(".claims");

fetch(dataLink + "claims")
  .then(res => res.json())
  .then(data => {
    content = data;
    render(claimList(content), claimContainer);
  });

const claimList = allClaims => html`
  <div class="claim-list">
    <p class="head row">
      ${
        Object.keys(allClaims[0]).map(
          key => html`
            <span class="cell" data-type="${key}" @click=${sort}>${key}</span>
          `
        )
      }
    </p>
    ${
      allClaims.map(
        eachClaim => html`
          <p class="row" @click=${edit}>
            ${
              Object.keys(eachClaim).map(
                (key, i) =>
                  html`
                    <span class="cell">${Object.values(eachClaim)[i]}</span>
                  `
              )
            }
          </p>
        `
      )
    }
  </div>
`;
// const filterList = eachFilter =>
//   html`
//     <p>${eachFilter}</p>
//   `;

// render(filterList("... filter list ..."), filterContainer);

function edit(e) {
  const editInput = document.createElement("input");
  editInput.classList.add("edit");
  e.target.appendChild(editInput);
  editInput.value = e.target.textContent;
}
function sort(e) {
  const sortBy = e.target.dataset.type;
  console.log(Array.isArray(content));
  content = content.sort((a, b) => {
    if (Number(a.money) > Number(b.money)) {
      return 1;
    }
    if (Number(a.money) === Number(b.money)) {
      return 0;
    }
    if (Number(a.money) < Number(b.money)) {
      return -1;
    }
  });
  render(claimList(content), claimContainer);
}
