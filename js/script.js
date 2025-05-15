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
	const loading = document.getElementById('results-loading');
	const resultsSection = document.getElementById('results-list');
	loading.style.display = 'block';
	resultsSection.innerHTML = '';

	searchMovies(searchQuery)
		.then(res => {
			console.log(res);
			if (res.total_results == 0) {
				throw new Error('No results found');
			}
			res.results.forEach(movie => {
				if (movie.title && movie.poster_path) {
					const card = createMovieCard(movie);
					resultsSection.appendChild(card);
				}
			});
		})
		.catch((err => {
			console.log(err);
			resultsSection.innerHTML = `<p class="error-message">${err.message}</p>`;
		}))
		.finally(() => {
			loading.style.display = 'none';
		});
})
