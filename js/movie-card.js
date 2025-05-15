class MovieCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const template = document.createElement('template');
		template.innerHTML = `
			<article class="movie-card">
				<img class="movie-poster" alt="Movie Poster">
				<div class="movie-details">
					<h3 class="movie-title"></h3>
					<p class="movie-genre"></p>
					<p class="movie-synopsis"></p>
				</div>
			</article>
		`;
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', 'css/movie-card.css');
		this.shadowRoot.appendChild(linkElem);
	}

	static get observedAttributes() {
		return ['img', 'title', 'synopsis', 'genre'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const poster = this.shadowRoot.querySelector('.movie-poster');
		const title = this.shadowRoot.querySelector('.movie-title');
		const synopsis = this.shadowRoot.querySelector('.movie-synopsis');
		const genre = this.shadowRoot.querySelector('.movie-genre');
		const attr_img = this.getAttribute('img');
		if (attr_img) {
			poster.src = attr_img;
			poster.alt = this.getAttribute('title') ? `Poster of ${this.getAttribute('title')}` : 'Movie poster';
		} else if (poster) {
			poster.src = "https://placehold.co/185x278?text=Poster+Unavailable";
			poster.alt = "Poster unavailable";
		}
		title.textContent = this.getAttribute('title') || '';
		synopsis.textContent = this.getAttribute('synopsis') || '';
		genre.textContent = this.getAttribute('genre') || '';
	}
}
customElements.define('movie-card', MovieCard);

function createMovieCard(movie) {
	const genres = {
		28: "Action",
		12: "Adventure",
		16: "Animation",
		35: "Comedy",
		80: "Crime",
		99: "Documentary",
		18: "Drama",
		10751: "Family",
		14: "Fantasy",
		36: "History",
		27: "Horror",
		10402: "Music",
		9648: "Mystery",
		10749: "Romance",
		878: "Science Fiction",
		10770: "TV Movie",
		53: "Thriller",
		10752: "War",
		37: "Western"
	};
	const card = document.createElement('movie-card');
	card.setAttribute('title', movie.title);
	if (movie.overview) {
		card.setAttribute('synopsis', movie.overview);
	}
	if (movie.genre_ids && Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
		const genreNames = movie.genre_ids.map(id => genres[id]).filter(Boolean).join(', ');
		if (genreNames) {
			card.setAttribute('genre', genreNames);
		}
	}
	if (movie.poster_path) {
		card.setAttribute('img', 'https://image.tmdb.org/t/p/w185' + movie.poster_path);
	}
	return card;
}
