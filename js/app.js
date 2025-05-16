import { searchMovies } from './api/movieAPI.js';
import './components/movieList.js';

let currentSearchId = 0;

document.getElementById('search-form').addEventListener('submit', function(e) {
	e.preventDefault();
	const searchQuery = document.getElementById('search-input').value;
	const movieList = document.getElementById('movie-list');
	movieList.loading = true;
	movieList.error = '';

	currentSearchId++;
	const searchId = currentSearchId;
	searchMovies(searchQuery)
		.then(res => {
			if (searchId !== currentSearchId) return;
			if (res.total_results == 0) {
				throw new Error('No results found');
			}
			movieList.movies = res.results;
		})
		.catch((err => {
			movieList.error = err.message;
		}))
		.finally(() => {
			movieList.loading = false;
		});
})
