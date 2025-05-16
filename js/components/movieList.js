import { createMovieItem } from './movieCard.js';

class MovieList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const template = document.createElement('template');
		template.innerHTML = `
			<div id="loading" hidden>Loading...</div>
			<div id="error"></div>
			<div id="list">
				<slot></slot>
			</div>
		`;
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', 'css/search-results.css');
		this.shadowRoot.appendChild(linkElem);
	}

	set loading(val) {
		this.shadowRoot.getElementById('loading').hidden = !val;
	}
	set error(msg) {
		this.shadowRoot.getElementById('error').textContent = msg || '';
	}
	set movies(list) {
		const listElem = this.shadowRoot.getElementById('list');
		listElem.innerHTML = '';
		this.error = '';
		list.forEach(item => {
			const elem = createMovieItem(item);
			listElem.appendChild(elem);
		});
	}
}
customElements.define('movie-list', MovieList);
