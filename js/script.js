const headers = {
	accept: 'application/json',
	Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjZjMjcwNjdiZDVmOWQ2MGYzMDVmY2UxNmQwOGM4ZiIsIm5iZiI6MTc0NzIyMzg2NS4zNTksInN1YiI6IjY4MjQ4NTM5NDkzM2ZlMTQ1NTMzM2Y2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._k-JWPFtG8DbUy307_DOiVVNHQpuB3q8Qb249G2wMHM'
}

async function searchMovies(query, page = 1) {
	const url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`
	const options = { method: 'GET', headers };
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	return await response.json();
}

class MovieCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const template = document.getElementById('movie-card-template');
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', 'css/movie-card.css'); // ajuste o caminho conforme seu arquivo
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

function createMovieCard(movie) {
	const card = document.createElement('movie-card');
	card.setAttribute('img', 'https://image.tmdb.org/t/p/w185' + movie.poster_path);
	card.setAttribute('title', movie.title);
	card.setAttribute('synopsis', movie.overview);
	const genreNames = movie.genre_ids.map(id => genres[id]).filter(Boolean).join(', ');
	card.setAttribute('genre', genreNames);
	return card;
}

function renderSearchResults(movies) {
	const resultsSection = document.querySelector('.search-results');
	resultsSection.innerHTML = '';
	movies.forEach(movie => {
		if (movie.title && movie.poster_path) {
			const card = createMovieCard(movie);
			resultsSection.appendChild(card);
		}
	});
}

document.getElementById('search-form').addEventListener('submit', function(e) {
	e.preventDefault();
	const searchQuery = document.getElementById('search-input').value;
	searchMovies(searchQuery)
		.then(res => {
			console.log(res);
			renderSearchResults(res.results);
		});
})
