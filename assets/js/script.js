const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieResult = document.getElementById('movieResult');

const apiKey = "d6482676";

searchBtn.addEventListener('click',function(){

       const movieName = movieInput.value;

       if(movieName){

        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`; 

        movieResult.innerHTML = `<div class = "spinner-border text-primary" role="status></div>`
        
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            if(data.Search){

                let movieHTML = '<div class="row">';

                data.Search.forEach(movie =>{

                    let poster = (movie.Poster !== "N/A") ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";

                    movieHTML += `
                            <div class="col-md-3 mb-4">
                                <div class="card h-100">
                                    <img src="${poster}" class="card-img-top" alt="${movie.Title}" style="height: 300px; object-fit: cover;">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.Title}</h5>
                                        <p class="card-text">${movie.Year}</p>
                                        <button class="btn btn-primary btn-sm" onclick="getMovieDetails('${movie.imdbID}')">More Details</button>
                                    </div>
                                </div>
                            </div>
                        `;

                });

                movieHTML += '</div>';
                movieResult.innerHTML = movieHTML;

            }else{
                movieResult.innerHTML = `<div class="alert alert-danger">No results found. Please try again with a different keyword.</div>`;
            }
        })
        .catch(error => {
            console.error("Error:",error);
            movieResult.innerHTML = `<div class="alert alert-danger">Something went wrong!</div>`;
        });
        
    }else{
        alert("Please enter a movie name!");
    }
});

movieInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        
        searchBtn.click();
    }
});

function getMovieDetails(id){

    const apiUrl =`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;

    movieResult.innerHTML = `<div class="spinner-border text-warning" role="status"></div>`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data =>{

        console.log("Full Movie Data:", data);

        let poster = (data.Poster !== "N/A") ? data.Poster : "https://via.placeholder.com/300x450?text=No+Image";

        movieResult.innerHTML = `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${poster}" class="img-fluid rounded-start w-100" alt="${data.Title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="card-title">${data.Title}</h2>
                                <p class="text-muted">${data.Year} | ${data.Genre} | ${data.Runtime}</p>
                                <p class="card-text"><strong>Plot:</strong> ${data.Plot}</p>
                                <p class="card-text"><strong>Director:</strong> ${data.Director}</p>
                                <p class="card-text"><strong>Actors:</strong> ${data.Actors}</p>
                                <p class="card-text"><strong>Awards:</strong> ${data.Awards}</p>
                                <p class="card-text"><h4 class="text-warning">⭐ ${data.imdbRating} / 10</h4></p>
                                
                                <br>
                                <button class="btn btn-secondary" onclick="window.location.reload()">Back to Search</button>
                                <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-warning">View on IMDb</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    })

    .catch(error => {
        console.log("Error: ",error);
        movieResult.innerHTML = `<div class="alert alert-danger">Cant found more details!</div>`;
    });
}


function searchCategory(category){

    movieInput.value = category;
    searchBtn.click();

}


function loadTopRatedMovies() {

    const topRatedGrid = document.getElementById('topRatedGrid');
    

    const topMovies = ['tt0111161', 'tt0068646', 'tt0468569', 'tt0110912'];

    topMovies.forEach(id => {
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if(data.Response === "True") {
                    topRatedGrid.innerHTML += `
                        <div class="col-md-3 mb-3">
                            <div class="card h-100 bg-dark text-white border-warning">
                                <img src="${data.Poster}" class="card-img-top" alt="${data.Title}" style="width: 100%; height: auto;">
                                
                                <div class="card-body d-flex flex-column">
                                    <h6 class="card-title text-truncate">${data.Title}</h6>
                                    <p class="card-text text-warning">⭐ ${data.imdbRating}</p>
                                    
                                    <button class="btn btn-primary btn-sm w-100 mt-auto" onclick="getMovieDetails('${data.imdbID}')">More Details</button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
    });
}

loadTopRatedMovies();