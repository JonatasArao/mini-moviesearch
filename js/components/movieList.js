import './movieCard.js'

class MovieList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', 'css/movie-list.css');
		this.shadowRoot.appendChild(linkElem);
		this._contentContainer = document.createElement('div');
		this._contentContainer.className = 'movie-list'
		this.shadowRoot.appendChild(this._contentContainer);
	}

	connectedCallback() {
		this._render();
	}

	set loading(val) {
		this._contentContainer.querySelector('#loading').hidden = !val;
		if (val) {
			this.movies = [];
		}
	}
	set error(msg) {
		this.movies = [];
		this._contentContainer.querySelector('#error').textContent = msg || '';
	}
	set movies(list) {
		const listCards = this._contentContainer.querySelector('#list');
		if (listCards) {
			listCards.innerHTML = '';
			if (list) {
				list.forEach(movie => {
					const card = document.createElement('movie-card');
					card.movie = movie;
					listCards.appendChild(card);
				});
			}
		}
	}

	_render() {
		this._contentContainer.innerHTML = '';
		const template = document.createElement('template');
		template.innerHTML = `
			<div id="loading" class="loading" hidden>Loading...</div>
			<div id="error" class="error"></div>
			<div id="list" class="list"></div>
		`;
		this._contentContainer.appendChild(template.content.cloneNode(true));
	}
}
customElements.define('movie-list', MovieList);
