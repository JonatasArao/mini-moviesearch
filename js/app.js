import { searchMovies } from './api/movieAPI.js';
import './components/movieList.js';

let currentSearchId = 0;

const homeTitle = document.getElementById('home-title');
const searchForm = document.getElementById('search-form');
const pagination = document.getElementById('pagination')
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

let totalPages;
let currentPage;

homeTitle.addEventListener('click', function(e) {
	const movieList = document.getElementById('movie-list');
	currentPage = 1;
	movieList.movies = [];
	movieList.loading = false;
	movieList.error = '';
	pagination.hidden = true;
	pageInfo.textContent = '';
	document.body.classList.remove('searching');
});

function updateMovieList(searchQuery, page, updateTotalPages = false) {
	const movieList = document.getElementById('movie-list');
	movieList.loading = true;
	movieList.error = '';
	currentSearchId++;
	const searchId = currentSearchId;
	document.body.classList.add('searching');
	searchMovies(searchQuery, page)
		.then(res => {
			if (searchId !== currentSearchId) return;
			if (updateTotalPages && res.total_results == 0) {
				throw new Error('No results found');
			}
			movieList.movies = res.results;
			if (updateTotalPages) {
				totalPages = res.total_pages;
			}
			pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
			prevPage.disabled = currentPage === 1;
			nextPage.disabled = currentPage === totalPages;
			pagination.hidden = undefined;
		})
		.catch((err => {
			movieList.error = err.message;
		}))
		.finally(() => {
			movieList.loading = false;
		});
}

searchForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const searchQuery = document.getElementById('search-input').value;
	currentPage = 1;
	updateMovieList(searchQuery, currentPage, true);
});

prevPage.addEventListener('click', function(e) {
	if (currentPage > 1) {
		currentPage--;
		const searchQuery = document.getElementById('search-input').value;
		updateMovieList(searchQuery, currentPage);
	}
});

nextPage.addEventListener('click', function(e) {
	if (currentPage < totalPages) {
		currentPage++;
		const searchQuery = document.getElementById('search-input').value;
		updateMovieList(searchQuery, currentPage);
	}
});
