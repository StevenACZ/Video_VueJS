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

  card.innerHTML = `
    <h2> ${title} </h2>
    <h3> ${url_video} </h3>
    <h4> ${description} </h4>
  `

  return card;
}

function insertCard(card) {
  const container = document.getElementById('videos');
  container.appendChild(card);
}