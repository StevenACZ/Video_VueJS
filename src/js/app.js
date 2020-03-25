let vue = new Vue({
  el: "#app",
  data: {
    title: '',
    url_video: '',
    description: '',

    editTitle: '',
    editUrl_video: '',
    editDescription: '',

    openAddVideoSection: false,
    openEditVideoSection: false
  },
  methods: {
    toggleOpenAddVideoSection() {
      this.openAddVideoSection = !this.openAddVideoSection
    },
    toggleOpenEditVideoSection() {
      this.openEditVideoSection = !this.openEditVideoSection
    },
    getVideos() {
      fetch('http://localhost:3000/videos')
      .then((response) => {
        return response.json();
      }).then((videos) => {
        videos.forEach(video => {
          this.insertCard(this.createCard(video));
        });
      })
    },
    createCard(video) {
      const {title, url_video, description} = video;
      const card = document.createElement('article');
      card.classList.add('card-video');
    
      card.innerHTML = `
      <figure class="card-video__preview-container">
        <button class="card-video__edit js_editVideo"><i class="fas fa-pencil-alt"></i></button>
        <button class="card-video__delete js_deleteVideo"><i class="fas fa-times"></i></button>
        <img class="card-video__preview" src="${url_video}" alt="Img">
      </figure>
    
      <div class="card-video__container-detail">
        <h3 class="card-video__sub-title">${title}</h3>
        <p class="card-video__views">0 visualizaciones</p>
    
        <p class="card-video__description">
          ${description}
        </p>
    
        <button class="btn btn--detail">Ver detalle</button>
      </div>
      `
    
      card.querySelector(".js_editVideo").onclick = () => {
        this.editVideo(video)
        this.toggleOpenEditVideoSection()
      };
      
      card.querySelector(".js_deleteVideo").onclick = () => {
        console.log('user ', video);
      };

      return card;
    },
    insertCard(card) {
      const container = document.querySelector('.videos');
      container.appendChild(card);
    },
    submitVideo() {
      fetch('http://localhost:3000/videos', {
        method: 'POST',
        body: JSON.stringify({
          title: this.title,
          url_video: this.url_video,
          description: this.description
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function(response) {
        return response.json()
      }).then(function(videoCreated) {
        console.log(videoCreated)
      })
    },
    editVideo(video) {
      this.editTitle = video.title;
      this.editUrl_video = video.description;
      this.editDescription = video.description;
    }
  }
})