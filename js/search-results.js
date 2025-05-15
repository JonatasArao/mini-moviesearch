class SearchResults extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const template = document.createElement('template');
		template.innerHTML = `
			<div id="results-loading" hidden>Loading...</div>
			<div id="results-error"></div>
			<div id="results-list">
				<slot></slot>
			</div>
		`;
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', 'css/search-results.css');
		this.shadowRoot.appendChild(linkElem);
		this._renderer = null;
	}

	set loading(val) {
		this.shadowRoot.getElementById('results-loading').hidden = !val;
	}
	set error(msg) {
		this.shadowRoot.getElementById('results-error').textContent = msg || '';
	}
	set itens(list) {
		const listElem = this.shadowRoot.getElementById('results-list');
		listElem.innerHTML = '';
		if (!this._renderer) {
			this.error = 'Renderer function is not set.';
			return;
		}
		this.error = '';
		list.forEach(item => {
			const elem = this._renderer(item);
			listElem.appendChild(elem);
		});
	}
	set renderer(fn) {
		this._renderer= fn;
	}
}
customElements.define('search-results', SearchResults);
