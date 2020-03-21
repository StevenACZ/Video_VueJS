const videoListSection = document.getElementById('js_video_list');
videoListSection.classList.add('active');

const addVideoSection = document.getElementById('js_addVideoForm')
const openAddVideoSection = document.getElementById('js_btnAddVideoButton')


openAddVideoSection.addEventListener('click', function() {
  videoListSection.classList.remove('active'); // VideoListSection se oculta
  addVideoSection.classList.add('active') // addVideoSection se dibuja

  addVideoClose = document.getElementById('js_btnCancelVideo')

  addVideoSection.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = addVideoSection.querySelector(".title")
    const url_video = addVideoSection.querySelector('.url-video')
    const description = addVideoSection.querySelector('.description')

    console.log(title.value)
    console.log(url_video.value)
    console.log(description.value)

    addVideoSection.classList.remove('active')
    videoListSection.classList.add('active');
  });

  addVideoClose.addEventListener('click', function() {
    addVideoSection.classList.remove('active')
    videoListSection.classList.add('active');
  });
});






/*const addVideoForm = document.getElementById("js_addVideoForm");
const title = addVideoForm.querySelector(".title")
const url_video = addVideoForm.querySelector('.url-video')
const description = addVideoForm.querySelector('.description')*/


// OBTENER DATOS DEL API
/*fetch('http://localhost:3000/videos')
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
}*/