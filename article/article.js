import * as bootstrap from 'bootstrap';
import '../style.scss';
import { nav } from '../nav';

const getarticle = async () => {
  // récupération des paramètres GET de l'url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const articleId = urlParams.get('id') ?? 1;
  console.log(articleId);

  // récupération des données
  const url = new URL(import.meta.env.VITE_API_URL);
  url.pathname = '/api/articles/' + articleId;
  const reponse = await fetch(url);
  const article = await reponse.json();

  return article;
};

const detailsarticle = () => {
  // url de l'image
  const imgUrl =  article.avatar;

  return `
      <div class="card col col-sm-10 col-md-8 col-xl-6 mx-auto">
        <img src="${imgUrl}" crossorigin class="card-img-top" alt="avatar de ${article.titre}">
        <div class="card-body">
          <h5 class="card-title">${article.titre}</h5>
          <h6 class="card-title">${article.contenue}</h6>
        </div>
      </div>
    `;
};

const article = await getarticle();

document.querySelector('#app').innerHTML = `
  <main>
    ${nav}

    <div class="container-fluid my-4">
      ${detailsarticle()}
    </div>
  </main>
`;
