// videos's container
const videoListSection = document.getElementById('js_video_list');
videoListSection.classList.add('active');

drawCard(); // Check if there are videos

// section where we going to add videos
const addVideoSection = document.getElementById('js_addVideoForm')

// button that the opens section where we going to add videos
const openAddVideoSection = document.getElementById('js_btnAddVideoButton')


openAddVideoSection.addEventListener('click', function() {
  videoListSection.classList.remove('active'); // VideoListSection hides
  addVideoSection.classList.add('active') // addVideoSection is drawn

  addVideoClose = document.getElementById('js_btnCancelVideo')

  addVideoSection.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = addVideoSection.querySelector(".title")
    const url_video = addVideoSection.querySelector('.url-video')
    const description = addVideoSection.querySelector('.description')

    console.log(title.value)
    console.log(url_video.value)
    console.log(description.value)

    sendVideo(title, url_video, description);

    addVideoSection.classList.remove('active')
    videoListSection.classList.add('active');
  });

  addVideoClose.addEventListener('click', function() {
    addVideoSection.classList.remove('active')
    videoListSection.classList.add('active');

    drawCard();
  });
});

// OBTENER DATOS DEL FORMULARIO ADD VIDEO Y ENVIARLO AL API
function sendVideo(title, url_video, description) {
  fetch('http://localhost:3000/videos', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      url_video: url_video.value,
      description: description.value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(function(response) {
    return response.json()
  }).then(function(videoCreated) {
    console.log(videoCreated)
  })
};

// OBTENER DATOS DEL API Y DIBUJARLOS EN LA PANTALLA
function drawCard() {
  fetch('http://localhost:3000/videos')
  .then(function(response) {
    return response.json();
  }).then(function(videos){
    if(videos[0]) { // Check if there are videos
      videoListSection.classList.add('active');
      videos.forEach(video => {
        insertCard(createCard(video))
      });
    } else {
      videoListSection.classList.remove('active');
      console.log('No videos')
    }
  });
};

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
};

function insertCard(card) {
  const container = document.getElementById('videos');
  container.appendChild(card);
};