import { searchMovies } from './api/movieAPI.js';
import './components/MovieList.js';

document.getElementById('search-form').addEventListener('submit', function(e) {
	e.preventDefault();
	const searchQuery = document.getElementById('search-input').value;
	const movieList = document.getElementById('movie-list');
	movieList.loading = true;
	movieList.error = '';

	searchMovies(searchQuery)
		.then(res => {
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
