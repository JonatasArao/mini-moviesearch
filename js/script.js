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

document.getElementById('search-form').addEventListener('submit', function(e) {
	e.preventDefault();
	const searchQuery = document.getElementById('search-input').value;
	const searchResults = document.getElementById('search-results');
	searchResults.renderer = (movie) => createMovieCard(movie);
	searchResults.loading = true;
	searchResults.error = '';

	searchMovies(searchQuery)
		.then(res => {
			if (res.total_results == 0) {
				throw new Error('No results found');
			}
			searchResults.itens = res.results;
		})
		.catch((err => {
			searchResults.error = err.message;
		}))
		.finally(() => {
			searchResults.loading = false;
		});
})
