const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieResult = document.getElementById('movieResult');

const apiKey = "d6482676";

searchBtn.addEventListener('click',function(){

       const movieName = movieInput.value;

       if(movieName){

        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`; 

        movieResult.innerHTML = `<div class = "spinner-border text-primary" role="status></div>`
        
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            if(data.Response === "True"){

                movieResult.innerHTML = `
                   <div class="card mb-3" style="max-width: 100%;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${data.Poster}" class="img-fluid rounded-start" alt="${data.Title}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body text-start">
                                        <h2 class="card-title">${data.Title}</h2>
                                        <p class="text-muted">${data.Year} | ${data.Genre}</p>
                                        <p class="card-text"><strong>Plot:</strong> ${data.Plot}</p>
                                        <p class="card-text"><strong>Director:</strong> ${data.Director}</p>
                                        <p class="card-text"><strong>Actors:</strong> ${data.Actors}</p>
                                        <p class="card-text"><small class="text-body-secondary">IMDb Rating: ⭐ ${data.imdbRating}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>    
                `;
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