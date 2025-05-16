class movieCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', 'css/movie-card.css');
		this.shadowRoot.appendChild(linkElem);
		this._contentContainer = document.createElement('div');
		this._contentContainer.className = 'movie-card'
		this.shadowRoot.appendChild(this._contentContainer);
	}

	static get observedAttributes() {
		return ['img', 'title', 'overview', 'genre'];
	}

	set movie(movie) {
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
		this.setAttribute('title', movie.title);
		if (movie.overview) {
			this.setAttribute('overview', movie.overview);
		}
		if (movie.genre_ids && Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
			const genreNames = movie.genre_ids.map(id => genres[id])
				.filter(Boolean)
				.join(', ');
			if (genreNames) {
				this.setAttribute('genre', genreNames);
			}
		}
		if (movie.poster_path) {
			this.setAttribute('img', 'https://image.tmdb.org/t/p/w185' + movie.poster_path);
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (newValue !== oldValue)
		{
			switch (name) {
				case 'img':
					this._posterSrc = newValue;
					this._posterAlt = `Poster of ${this._title}`
					break;
				case 'title':
					this._title = newValue;
					break;
				case 'overview':
					this._overview = newValue;
					break;
				case 'genre':
					this._genre = newValue;
					break;
			}
			this._render();
		}
	}

	connectedCallback() {
		if (!this.hasRendered) {
			this._render();
			this.hasRendered = true;
		}
	}

	_render() {
		const placeholder = 'img/poster_unavailable.svg'
		this._contentContainer.innerHTML = '';
		const template = document.createElement('template');
		template.innerHTML = `
			<img class="poster"
				src="${this._posterSrc || placeholder}"
				alt="${this._posterSrc ? this._posterAlt : 'Poster Unavailable'}"
				loading="lazy">
			<div class="details">
				<h3 class="title">${this._title || ''}</h3>
				${this._genre ? `<p class="genre">${this._genre}</p>` : ''}
				${this._overview ? `<p class="overview">${this._overview}</p>` : ''}
			</div>
		`;
		this._contentContainer.appendChild(template.content.cloneNode(true));
		const img = this._contentContainer.querySelector('.poster');
		img.addEventListener('load', () => {
			this.dispatchEvent(new CustomEvent('poster-loaded', { bubbles: true, composed: true }));
		});
		img.addEventListener('error', () => {
			img.src = placeholder;
			console.warn(`Poster image could not be loaded for movie: ${this._title || 'Unknown Title'}. Using placeholder.`);
			this.dispatchEvent(new CustomEvent('poster-loaded', { bubbles: true, composed: true }));
		});
	}
}
customElements.define('movie-card', movieCard);
