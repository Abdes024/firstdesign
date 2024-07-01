
    const menu = document.getElementById("navMenu");
    const navItems = document.getElementById("navItems");

    menu.addEventListener("click", function () {
      navItems.classList.toggle("hidden");
    });

    let swiper = new Swiper(".filmSwiper", {
        slidesPerView: 4,
        spaceBetween: 18,
        navigation: {
          nextEl: ".films-button-next",
          prevEl: ".films-button-prev",
        },
      });




  let latestSwiper = new Swiper(".latestSwiper", {
    slidesPerView: 4,
    spaceBetween: 18,
    navigation: {
      nextEl: ".latest-button-next",
      prevEl: ".latest-button-prev",
    },
  });

  let genreSwiper = new Swiper(".genreSwiper", {
    slidesPerView: 4,
    spaceBetween: 18,
    navigation: {
      nextEl: ".genre-button-next",
      prevEl: ".genre-button-prev",
    },
  });




// get searche input value
let search = document.getElementById('search')
let searchBtn = document.getElementById('search-btn')
let searchValue =''

let searchResults = document.getElementById('searchResults');

 // Get the container to display results
 let resultsContainer = document.getElementById('filmSwiperWrapper');


//  modal
// Get all elements with class 'slide'
let slides = document.querySelectorAll('.swiper-slide');

// Get the modal
let modal = document.getElementById('modalFilm');

// Get modal content elements
let modalCover = document.getElementById('cover');
let modalTitle = document.getElementById('title');
let modalYear = document.getElementById('year');
let  star = `<img class="star" src="./images/star.png" alt="star-icon"></img>`;
let modalRating = document.getElementById('rating');
let modalGenre = document.getElementById('genre');
let modalDescription = document.getElementById('description');
let modalCast = document.getElementById('cast');



searchBtn.addEventListener('click', function() {
  keywordResults.textContent = ''
  searchValue = search.value
  searchResults.style.display = "block"
  keywordResults.textContent = searchValue;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGNhYmM3ZGIwZDJmOWU5MmFmYTQwMzJkZTlmNTk2YiIsInN1YiI6IjY2NzQzZmQ5ZThlNDM0NDU3NmEzY2FiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WdpWw8Q1h7M9bnhJwugI9YsGVYv4D5I-GLHAt91kKv0'
    }
  };
  
    let genres = [];

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then(response => {
        genres = response.genres
        console.log(genres)
    })
    .catch(err => console.error(err));
    
  fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchValue)}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => {
       // Log the response (you can process it further here)
       console.log(response);
      let keywordResults = document.getElementById('keywordResults');
       // Clear any existing results
       resultsContainer.innerHTML = '';

       // Parse the response and create new swiper-slide divs
       response.results.forEach(film => {
           // Create a new div for each film
           let filmDiv = document.createElement('div');
           filmDiv.className = 'swiper-slide';

           let hoverInfos = document.createElement('div');

           hoverInfos.className = "info";

          
           // Add film details to the div
           filmDiv.innerHTML = `
               <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}">
               `;

              // Store film data in data attributes for modal use
              filmDiv.setAttribute('data-img', `https://image.tmdb.org/t/p/w500${film.poster_path}`);
              filmDiv.setAttribute('data-title', film.title);
              filmDiv.setAttribute('data-year', film.release_date ? film.release_date.split('-')[0] : 'N/A');
              filmDiv.setAttribute('data-rating', film.vote_average);
              filmDiv.setAttribute('data-description', film.overview);
              filmDiv.setAttribute('data-cast', 'Cast Info Here'); // You can fetch and display cast info if available

            // Fetch genres for this film
            let filmGenres = film.genre_ids.map(genreId => {
                let genreObj = genres.find(g => g.id === genreId);
                return genreObj ? genreObj.name : '';
            });

            // Join genres with comma separator
            let genreString = filmGenres.join(' | ');

            hoverInfos.innerHTML = `<h2 class="title-movie">${film.title}</h2>
            <p class="movie-year">${film.release_date ? film.release_date.split('-')[0] : 'N/A'}</p>
            <p class="movie-genre">${genreString}</p>
            <div class="movie-rating">
              <img class="star" src="./images/star.png" alt="star-icon">
              <span>${film.vote_average}</span>`;
              
            filmDiv.setAttribute('data-genre', genreString); // You can customize how genres are displayed
            // Add click event listener to the filmDiv to display the modal
            filmDiv.addEventListener('click', function() {
                // Get data attributes
                let img = filmDiv.getAttribute('data-img');
                let title = filmDiv.getAttribute('data-title');
                let year = filmDiv.getAttribute('data-year');
                let rating = filmDiv.getAttribute('data-rating');
                let genre = filmDiv.getAttribute('data-genre');
                let description = filmDiv.getAttribute('data-description');
                let cast = filmDiv.getAttribute('data-cast');

                // Update modal content
                modalCover.src = img;
                modalTitle.textContent = title;
                modalYear.textContent = year;
                modalRating.textContent = rating;
                modalGenre.textContent = genre;
                modalDescription.textContent = description;
                modalCast.textContent = cast;

                // Display the modal
                modal.style.display = 'flex';
            })

            filmDiv.appendChild(hoverInfos)
           // Append the new div to the results container
           resultsContainer.appendChild(filmDiv);
       });
    })
    .catch(err => console.error(err));
})


// latest film GET


// Get the container to display results
let latestContainer = document.getElementById('latestFilmsWrapper');

  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGNhYmM3ZGIwZDJmOWU5MmFmYTQwMzJkZTlmNTk2YiIsInN1YiI6IjY2NzQzZmQ5ZThlNDM0NDU3NmEzY2FiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WdpWw8Q1h7M9bnhJwugI9YsGVYv4D5I-GLHAt91kKv0'
    }
  };
    let genresList = document.getElementById('genresList');
    let genres = [];

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then(response => {
        genres = response.genres
    })
    .catch(err => console.error(err));
    
  fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => {
       // Log the response (you can process it further here)
       console.log(response);
       // Clear any existing results
       latestContainer.innerHTML = '';

       // Parse the response and create new swiper-slide divs
       response.results.forEach(film => {
           // Create a new div for each film
           let filmDiv = document.createElement('div');
           filmDiv.className = 'swiper-slide';

           let hoverInfos = document.createElement('div');

           hoverInfos.className = "info";

          
           // Add film details to the div
           filmDiv.innerHTML = `
               <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}">
               `;

              // Store film data in data attributes for modal use
              filmDiv.setAttribute('data-img', `https://image.tmdb.org/t/p/w500${film.poster_path}`);
              filmDiv.setAttribute('data-title', film.title);
              filmDiv.setAttribute('data-year', film.release_date ? film.release_date.split('-')[0] : 'N/A');
              filmDiv.setAttribute('data-rating', film.vote_average);
              filmDiv.setAttribute('data-description', film.overview);
              filmDiv.setAttribute('data-cast', 'Cast Info Here'); // You can fetch and display cast info if available

            // Fetch genres for this film
            let filmGenres = film.genre_ids.map(genreId => {
                let genreObj = genres.find(g => g.id === genreId);
                return genreObj ? genreObj.name : '';
            });

            // Join genres with comma separator
            let genreString = filmGenres.join(' | ');
            console.log(genreString)
            hoverInfos.innerHTML = `<h2 class="title-movie">${film.title}</h2>
            <p class="movie-year">${film.release_date ? film.release_date.split('-')[0] : 'N/A'}</p>
            <p class="movie-genre">${genreString}</p>
            <div class="movie-rating">
              <img class="star" src="./images/star.png" alt="star-icon">
              <span>${film.vote_average}</span>`;
              
            filmDiv.setAttribute('data-genre', genreString); // You can customize how genres are displayed
            // Add click event listener to the filmDiv to display the modal
            filmDiv.addEventListener('click', function() {
                // Get data attributes
                let img = filmDiv.getAttribute('data-img');
                let title = filmDiv.getAttribute('data-title');
                let year = filmDiv.getAttribute('data-year');
                let rating = filmDiv.getAttribute('data-rating');
                let genre = filmDiv.getAttribute('data-genre');
                let description = filmDiv.getAttribute('data-description');
                let cast = filmDiv.getAttribute('data-cast');

                // Update modal content
                modalCover.src = img;
                modalTitle.textContent = title;
                modalYear.textContent = year;
                modalRating.textContent = rating;
                modalGenre.textContent = genre;
                modalDescription.textContent = description;
                modalCast.textContent = cast;

                // Display the modal
                modal.style.display = 'flex';
            })

            filmDiv.appendChild(hoverInfos)
           // Append the new div to the results container
           latestContainer.appendChild(filmDiv);
       });
    })
    .catch(err => console.error(err));


// Function to fetch movies based on genre
function fetchMoviesByGenre(genreName) {
    // Get the container to display results
let latestContainer = document.getElementById('genreResults');

  
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGNhYmM3ZGIwZDJmOWU5MmFmYTQwMzJkZTlmNTk2YiIsInN1YiI6IjY2NzQzZmQ5ZThlNDM0NDU3NmEzY2FiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WdpWw8Q1h7M9bnhJwugI9YsGVYv4D5I-GLHAt91kKv0'
  }
};
  let genresList = document.getElementById('genresList');
  let genres = [];

  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => {
      genres = response.genres
  })
  .catch(err => console.error(err));
  
fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreName}`, options)
  .then(response => response.json())
  .then(response => {
     // Log the response (you can process it further here)
     console.log(response);
     // Clear any existing results
     latestContainer.innerHTML = '';

     // Parse the response and create new swiper-slide divs
     response.results.forEach(film => {
         // Create a new div for each film
         let filmDiv = document.createElement('div');
         filmDiv.className = 'swiper-slide';

         let hoverInfos = document.createElement('div');

         hoverInfos.className = "info";

        
         // Add film details to the div
         filmDiv.innerHTML = `
             <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}">
             `;

            // Store film data in data attributes for modal use
            filmDiv.setAttribute('data-img', `https://image.tmdb.org/t/p/w500${film.poster_path}`);
            filmDiv.setAttribute('data-title', film.title);
            filmDiv.setAttribute('data-year', film.release_date ? film.release_date.split('-')[0] : 'N/A');
            filmDiv.setAttribute('data-rating', film.vote_average);
            filmDiv.setAttribute('data-description', film.overview);
            filmDiv.setAttribute('data-cast', 'Cast Info Here'); // You can fetch and display cast info if available

          // Fetch genres for this film
          let filmGenres = film.genre_ids.map(genreId => {
              let genreObj = genres.find(g => g.id === genreId);
              return genreObj ? genreObj.name : '';
          });

          // Join genres with comma separator
          let genreString = filmGenres.join(' | ');

          hoverInfos.innerHTML = `<h2 class="title-movie">${film.title}</h2>
          <p class="movie-year">${film.release_date ? film.release_date.split('-')[0] : 'N/A'}</p>
          <p class="movie-genre">${genreString}</p>
          <div class="movie-rating">
            <img class="star" src="./images/star.png" alt="star-icon">
            <span>${film.vote_average}</span>`;
            
          filmDiv.setAttribute('data-genre', genreString); // You can customize how genres are displayed
          // Add click event listener to the filmDiv to display the modal
          filmDiv.addEventListener('click', function() {
              // Get data attributes
              let img = filmDiv.getAttribute('data-img');
              let title = filmDiv.getAttribute('data-title');
              let year = filmDiv.getAttribute('data-year');
              let rating = filmDiv.getAttribute('data-rating');
              let genre = filmDiv.getAttribute('data-genre');
              let description = filmDiv.getAttribute('data-description');
              let cast = filmDiv.getAttribute('data-cast');

              // Update modal content
              modalCover.src = img;
              modalTitle.textContent = title;
              modalYear.textContent = year;
              modalRating.textContent = rating;
              modalGenre.textContent = genre;
              modalDescription.textContent = description;
              modalCast.textContent = cast;

              // Display the modal
              modal.style.display = 'flex';
          })

          filmDiv.appendChild(hoverInfos)
         // Append the new div to the results container
         latestContainer.appendChild(filmDiv);
     });
  })
  .catch(err => console.error(err));
}


// Function to handle genre click
function handleGenreClick(event) {
    let bygenre = document.getElementById('bygenre');
    // Remove 'active' class from all genre list items
    document.querySelectorAll('.list-genre').forEach(item => {
        
        item.classList.remove('active');
    });

    // Add 'active' class to the clicked genre list item
    event.target.classList.add('active');
    bygenre.textContent = event.target.textContent;
    // Get the genre name from the data attribute
    let genreName = event.target.getAttribute('data-name');

    // Fetch movies by the selected genre
    fetchMoviesByGenre(genreName);
}

// Add click event listeners to all genre list items
document.querySelectorAll('.list-genre').forEach(item => {
    
    item.addEventListener('click', handleGenreClick);
});



// Get the modal
let signupModal = document.getElementById('signupModal');

// Get the buttons that open the modal
let navLoginBtn = document.getElementById('navLoginBtn');
let navSignupBtn = document.getElementById('navSignupBtn');
let footerLoginBtn = document.getElementById('footerLoginBtn');
let footerSignupBtn = document.getElementById('footerSignupBtn');

// Get the tab buttons inside the modal
let signupTab = document.getElementById('signupTab');
let loginTab = document.getElementById('loginTab');

// Get the login and signup forms inside the modal
let signupForm = document.getElementById('signupForm');
let loginForm = document.getElementById('loginForm');

// Get the <span> element that closes the modal
let closeSpan = document.querySelector('.close');

signupTab.addEventListener('click', function() {
    // Remove active class from both tabs
    loginTab.classList.remove('active');
    signupForm.classList.remove('hidden');

    signupTab.classList.add('active');
    loginForm.classList.add('hidden');
})

loginTab.addEventListener('click', function() {
    // Remove active class from both tabs
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');

    loginTab.classList.add('active');
    signupForm.classList.add('hidden');
})
// Function to open the modal and activate the appropriate tab
function openModal(activeTab) {
    signupModal.style.display = 'flex';

    // Remove active class from both tabs
    signupTab.classList.remove('active');
    loginTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.remove('hidden');

    // Add active class to the specified tab
    if (activeTab === 'signup') {
        signupTab.classList.add('active');
        loginForm.classList.add('hidden');
    } else {
        loginTab.classList.add('active');
        signupForm.classList.add('hidden');
    }
}

// Add event listeners to the buttons
navLoginBtn.addEventListener('click', function() {
    openModal('login');
});

navSignupBtn.addEventListener('click', function() {
    openModal('signup');
});

footerLoginBtn.addEventListener('click', function() {
    openModal('login');
});

footerSignupBtn.addEventListener('click', function() {
    openModal('signup');
});

// Get the <span> element that closes the modal
let spanSignup = document.getElementsByClassName('closeModalSignup')[0];

// Get the <span> element that closes the modal
let span = document.getElementsByClassName('closeModalFilm')[0];

// When the user clicks on <span> (x), close the modal
spanSignup.onclick = function() {
    signupModal.style.display = 'none';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == signupModal) {
        modal.style.display = 'none';
        signupModal.style.display = 'none';
    }
}