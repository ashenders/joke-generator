// Add event listeners for the DOM load event and the submit button
document.addEventListener('DOMContentLoaded', getJokes);
document.querySelector('#submit').addEventListener('click', getJokes);

function getJokes(e) {
  // Instantiate open and send an XMLHttpRequest
  const xhr = new XMLHttpRequest();
  const numberOfJokes = document.querySelector('#numberOfJokes').value;
  xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}`);

  xhr.send();

  xhr.onload = function () {
    if (this.status === 200) {
      // Parse JSON response
      const jokes = JSON.parse(this.responseText);

      // Create UI elements
      const container = document.querySelector('#joke-container');
      container.innerHTML = '';
      const list = document.createElement('ol');
      const jokeHeader = document.createElement('h4');
      jokeHeader.textContent = 'Jokes';

      // Iterate through jokes and append to output
      let output = '';
      if (jokes.type === 'success') {
        jokes.value.forEach(function (joke) {
          output += `<li>${joke.joke}</li>`;
        });

        // Insert UI elements into DOM
        list.innerHTML = output;
        container.appendChild(list);
        container.insertBefore(jokeHeader, list);
      } else {
        // Insert error message into DOM if something goes wrong
        const errorHeader = document.createElement('h5');
        errorHeader.textContent = `Something went wrong...`;
        container.appendChild(errorHeader);
      }

    }
  };
  e.preventDefault();
}