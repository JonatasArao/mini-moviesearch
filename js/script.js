const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjZjMjcwNjdiZDVmOWQ2MGYzMDVmY2UxNmQwOGM4ZiIsIm5iZiI6MTc0NzIyMzg2NS4zNTksInN1YiI6IjY4MjQ4NTM5NDkzM2ZlMTQ1NTMzM2Y2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._k-JWPFtG8DbUy307_DOiVVNHQpuB3q8Qb249G2wMHM'
	}
};

async function searchMovies(query) {
	return await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
		.then(res => res.json())
		.catch(err => console.error(err));
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
	e.preventDefault();
	const searchQuery = document.getElementById('searchInput').value;
	searchMovies(searchQuery)
		.then(res => {
			console.log(res);
		});
})
