const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieResult = document.getElementById('movieResult');
const topRatedGrid = document.getElementById('topRatedGrid');
const topRatedSection = document.getElementById('topRatedSection');

const apiKey = 'd6482676'; 


function createCardHTML(movie, delay = 0) {
    let poster = (movie.Poster !== "N/A") ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";
    
    
    const styleDelay = `animation-delay: ${delay}ms`;

    return `
        <div class="col-6 col-md-3 mb-4 fade-in" style="${styleDelay}">
            <div class="movie-card" onclick="getMovieDetails('${movie.imdbID}')">
                <div class="movie-poster-container">
                    <img src="${poster}" class="movie-poster" alt="${movie.Title}">
                </div>
                <div class="card-body-custom">
                    <div>
                        <h5 class="movie-title">${movie.Title}</h5>
                        <div class="movie-meta">
                            <span>${movie.Year}</span>
                            <span>${movie.Type || 'Movie'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


searchBtn.addEventListener('click', function() {
    const movieName = movieInput.value;
    
    if(movieName) {
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;
        
        
        movieResult.innerHTML = `<div class="spinner-custom"></div>`;
        
        topRatedSection.style.display = 'none';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if(data.Search) {
                    let movieHTML = '<div class="row g-4">';
                    
                    
                    data.Search.forEach((movie, index) => {
                        movieHTML += createCardHTML(movie, index * 100);
                    });
                    
                    movieHTML += '</div>';

                    
                    movieResult.innerHTML = `
                        <div class="section-header mt-4">
                            <h3 class="section-title">Results for "${movieName}"</h3>
                            <button class="btn btn-sm btn-outline-secondary ms-auto" onclick="window.location.reload()">Clear Search</button>
                        </div>
                        ${movieHTML}
                    `;
                } else {
                    movieResult.innerHTML = `<div class="alert alert-warning text-center mt-4">No results found for "${movieName}"</div>`;
                }
            })
            .catch(error => {
                console.error("Error:", error);
                movieResult.innerHTML = `<div class="alert alert-danger text-center mt-4">Something went wrong!</div>`;
            });
    } else {
        
        movieInput.focus();
        movieInput.parentElement.style.borderColor = 'var(--accent-color)';
        setTimeout(() => movieInput.parentElement.style.borderColor = 'rgba(255,255,255,0.08)', 1000);
    }
});


movieInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});


function getMovieDetails(id) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
    
    movieResult.innerHTML = `<div class="spinner-custom"></div>`;
    topRatedSection.style.display = 'none';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let poster = (data.Poster !== "N/A") ? data.Poster : "https://via.placeholder.com/300x450?text=No+Image";
            
            
            window.scrollTo({ top: 0, behavior: 'smooth' });

            movieResult.innerHTML = `
                <div class="fade-in">
                     <button class="btn btn-outline-light mb-4" onclick="window.location.reload()">← Back to Home</button>
                     
                     <div class="details-card">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${poster}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 400px;" alt="${data.Title}">
                            </div>
                            <div class="col-md-8">
                                <div class="details-content">
                                    <h2 class="display-5 fw-bold mb-2">${data.Title}</h2>
                                    <div class="mb-3 text-secondary">
                                        <span class="badge-custom border border-secondary">${data.Year}</span>
                                        <span class="badge-custom border border-secondary">${data.Rated}</span>
                                        <span class="badge-custom border border-secondary">${data.Runtime}</span>
                                    </div>
                                    
                                    <div class="d-flex align-items-center mb-4">
                                        <span class="fs-4 text-warning fw-bold me-2">★ ${data.imdbRating}</span>
                                        <span class="text-secondary">/ 10 IMDb</span>
                                    </div>

                                    <p class="lead fs-6 text-light opacity-75 mb-4">${data.Plot}</p>
                                    
                                    <div class="mb-2"><strong class="text-secondary">Genre:</strong> <span class="text-light">${data.Genre}</span></div>
                                    <div class="mb-2"><strong class="text-secondary">Director:</strong> <span class="text-light">${data.Director}</span></div>
                                    <div class="mb-2"><strong class="text-secondary">Cast:</strong> <span class="text-light">${data.Actors}</span></div>
                                    
                                    <div class="mt-4 pt-3 border-top border-secondary border-opacity-25">
                                        <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-warning fw-bold px-4 rounded-pill">View on IMDb</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
}


function searchCategory(category) {
    movieInput.value = category;
    searchBtn.click();
}


function loadTopRatedMovies() {
    const topMovies = ['tt0468569', 'tt0816692', 'tt1375666', 'tt0110912']; 

    topMovies.forEach((id, index) => {
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if(data.Response === "True") {
                    
                    const cardHTML = createCardHTML(data, index * 200);
                    topRatedGrid.innerHTML += cardHTML;
                }
            });
    });
}


function discoverMovie() {
    const movieIDs = [
        "tt0468569", "tt0133093", "tt1375666", "tt0167260", 
        "tt0109830", "tt0076759", "tt0111161", "tt0816692", 
        "tt0050083", "tt0068646", "tt1877830", "tt0110912"
    ];
    const randomIndex = Math.floor(Math.random() * movieIDs.length);
    const randomId = movieIDs[randomIndex];
    getMovieDetails(randomId);
}


loadTopRatedMovies();