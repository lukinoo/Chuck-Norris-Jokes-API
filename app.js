const jokes = document.getElementById('jokes');
const button = document.getElementById('button');
const jokesList = document.getElementById('jokes-list');
const favSection = document.getElementById('fav-section');
const saveButton = document.getElementById('save-button');
const sliderButton = document.getElementById('slider-btn');
const darkBackground = document.getElementById('dark-bg');
// URL
const URL = "http://api.icndb.com/jokes/random";
let state = true;

// function for generate random joke
const randomJokes = (e) => {
    e.preventDefault();
    let randomJoke = "";
    fetch(URL)
        .then(response => response.json())
        .then(Data => {
            randomJoke = Data.value.joke;
            // displaying random joke here;
            jokes.innerHTML = randomJoke;
        })
}

const favJokesSaver = () => {
    const newFavJokeList = document.createElement('div');
    newFavJokeList.classList.add('favorite-joke');
    // fav joke text
    const newJoke = document.createElement('li');
    newJoke.classList.add('fav-joke');
    newJoke.innerHTML = jokes.innerHTML;
    newFavJokeList.appendChild(newJoke);
    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    newFavJokeList.appendChild(deleteButton);
    
    // append childs
    jokesList.appendChild(newFavJokeList);
}

const favoriteJokeMenu = (e) => {
    state = !state;
    if (!state) {
        e.target.innerHTML = `<i class="fas fa-times"></i>`;
        favSection.classList.add('active');
        darkBackground.style.display = "block";

    } else {
        e.target.innerHTML = `<i class="fas fa-bars"></i>`;
        favSection.classList.remove('active');
        darkBackground.style.display = "none";
    }
}

const deleteFavJokes = (e) => {
    const favJoke = e.target;

    if (e.target.classList[0] === "delete-button") {
        const item = favJoke.parentElement;
        item.style.animation = `deleteFavJoke 0.75s ease`;
        item.addEventListener('animationend',() => {
            item.remove();
        })
    }
}

// event side
button.addEventListener('click',randomJokes);
saveButton.addEventListener('click',favJokesSaver);
sliderButton.addEventListener('click',favoriteJokeMenu);
jokesList.addEventListener('click',deleteFavJokes);
