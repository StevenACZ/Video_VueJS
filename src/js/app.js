// OBTENER DATOS DEL API
fetch('http://localhost:3000/videos')
.then(function(response) {
  return response.json();
}).then(function(videos){
  videos.forEach(video => {
    insertCard(createCard(video))
  });
});

function createCard(video) {
  const {title, url_video, description} = video;
  const card = document.createElement('article');
  card.classList.add('card-video');

  card.innerHTML = `
  <figure class="card-video__preview-container">
    <button class="card-video__edit" id="js_editVideo"><i class="fas fa-pencil-alt"></i></button>
    <button class="card-video__delete" id="js_deleteVideo"><i class="fas fa-times"></i></button>
    <img class="card-video__preview" src="${url_video}" alt="Img">
  </figure>

  <div class="card-video__container-detail">
    <h3 class="card-video__sub-title">${title}</h3>
    <p class="card-video__views">0 visualizaciones</p>

    <p class="card-video__description">
      ${description}
    </p>

    <button class="btn btn--detail" id="js_btnViewDetail">Ver detalle</button>
  </div>
  `

  return card;
}

function insertCard(card) {
  const container = document.getElementById('videos');
  container.appendChild(card);
}