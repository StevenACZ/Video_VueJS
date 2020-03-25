let vue = new Vue({
  el: "#app",
  data: {
    title: '',
    url_video: '',
    description: '',

    editTitle: '',
    editUrl_video: '',
    editDescription: '',
    editId: 0,

    detailTitle: '',
    detailUrl_video: '',
    detailDescription: '',

    openAddVideoSection: false,
    openEditVideoSection: false,
    openDetailVideoSection: true
  },
  methods: {
    toggleOpenAddVideoSection() {
      this.openAddVideoSection = !this.openAddVideoSection
    },
    toggleOpenEditVideoSection() {
      this.openEditVideoSection = !this.openEditVideoSection
    },
    toggleOpenDetailVideoSection() {
      this.openDetailVideoSection = !this.openDetailVideoSection
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
      const {title, url_video, description, id} = video;
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
        <p class="card-video__views">${id} visualizaciones</p>
    
        <p class="card-video__description">
          ${description}
        </p>
    
        <button class="btn btn--detail js_btnDetail">Ver detalle</button>
      </div>
      `
    
      card.querySelector(".js_editVideo").onclick = () => {
        this.editVideo(video)
        this.toggleOpenEditVideoSection()
      };
      
      card.querySelector(".js_deleteVideo").onclick = () => {
        this.deleteVideo(video);
      };

      card.querySelector(".js_btnDetail").onclick = () => {
        this.toggleOpenDetailVideoSection()
        this.detailTitle = video.title;
        this.detailUrl_video = video.url_video;
        this.detailDescription = video.description;
        this.removeAllChilds()
      }

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
      this.editUrl_video = video.url_video;
      this.editDescription = video.description;
      this.editId = video.id;
    },
    submitEditVideo() {
      fetch(`http://localhost:3000/videos/${this.editId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.editTitle,
          url_video: this.editUrl_video,
          description: this.editDescription
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function(response) {
        return response.json()
      }).then(function(videoEdited) {
        console.log(videoEdited)
      })
    },
    deleteVideo(video) {
      fetch(`http://localhost:3000/videos/${video.id}`, {
        method: 'DELETE'
      })
    },
    /*removeAllChilds() {
      let a = document.querySelector(".detail__detail-container");
      while(a.hasChildNodes()) {
        a.removeChild(a.firstChild);	
      }
    }*/
  }
})