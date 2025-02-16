document.addEventListener('DOMContentLoaded', function () {
    const titles = document.querySelectorAll('.destinations article h3');
    titles.forEach(title => {
        title.style.color = 'blue';
        title.style.fontSize = '2em';
        title.style.textAlign = 'center';

        // cand pun mouse-ul pe titlu, culoarea se schimba in verde si marimea in 2.5em
        title.addEventListener('mouseover', function () {
            title.style.color = 'green';
            title.style.fontSize = '2.5em';
        });

        // cand iau mouse-ul, se reseteaza la normal
        title.addEventListener('mouseout', function () {
            title.style.color = 'blue';
            title.style.fontSize = '2em';
        });
    });

    //cerinta: Folosirea și modificarea evenimentelor generate de mouse și tastatură;
    //daca am mouse-ul pe titlu si apas tasta 'r', se reseteaza la normal, desi am mouse-ul pe titlu
    document.addEventListener('keydown', function (event) {
        if (event.key === 'r') { // Apăsarea tastei 'r' va reseta stilul
            titles.forEach(title => {
                title.style.color = 'blue';
                title.style.fontSize = '2em';
            });
        }
    });

    // Selectarea elementelor de telefon și email
    const phoneElement = document.querySelector('#telefon');
    const emailElement = document.querySelector('#email');

    // Modificarea stilurilor pentru elementul de telefon
    if (phoneElement) {
        phoneElement.style.color = 'purple';
        phoneElement.style.fontSize = '1.5em';
        phoneElement.style.fontWeight = 'bold';
    }

    // Modificarea stilurilor pentru elementul de email
    if (emailElement) {
        emailElement.style.color = 'orange';
        emailElement.style.fontSize = '1.5em';
        emailElement.style.fontWeight = 'bold';
    }

    // cerinta: Inputuri funcționale 
    // (de exemplu: input de tip text/range/number/radio/checkbox, select, textarea);
    // input de buget(EURO) si se sugeraza o destinatie in functie de buget
    const suggestButton = document.querySelector('#suggest-button');
    suggestButton.addEventListener('click', function () {
        const budget = document.querySelector('#budget').value;
        const suggestion = document.querySelector('#suggestion');
        if (budget >= 1000 && budget < 1500) {
            const days = Math.floor(budget / 150);
            suggestion.textContent = `Sugestie de locație: Paris. Poți sta ${days} zile în Paris.`;
        } else if (budget >= 1500 && budget < 2000) {
            const days = Math.floor(budget / 250);
            suggestion.textContent = `Sugestie de locație: Bali. Poți sta ${days} zile în Bali.`;
        } else if (budget >= 2000 && budget < 2500) {
            const days = Math.floor(budget / 300);
            suggestion.textContent = `Sugestie de locație: Tokyo. Poți sta ${days} zile în Tokyo.`;
        } else {
            suggestion.textContent = 'Nu avem sugestii pentru acest buget.';
        }

        // cerinta: Folosirea setTimeout și/sau setInterval;
        // dupa 10 secunde, textul cu sugestia se sterge
        setTimeout(function () {
            suggestion.textContent = '';
        }, 10000);

        // dupa ce apas pe buton, sugestia se face vizibila/invizibila la fiecare 0.5 secunde
        let isVisible = true;
        const intervalId = setInterval(function () {
            suggestion.style.visibility = isVisible ? 'hidden' : 'visible';
            isVisible = !isVisible;
        }, 500);

        // se opreste tot dupa 10 secunde
        setTimeout(function () {
            clearInterval(intervalId);
            suggestion.style.visibility = 'visible';
        }, 10000);
    });

    // marire random a imaginilor
const images = document.querySelectorAll('.image');
let currentIndex = -1;

setInterval(function () {
    if (currentIndex !== -1) {
        images[currentIndex].style.transform = 'scale(1)';
    }

    const randomIndex = Math.floor(Math.random() * images.length);
    images[randomIndex].style.transform = 'scale(1.5)';

    currentIndex = randomIndex;
}, 3000);

    const saveMessageButton = document.querySelector('#save-message');
    const messageTextarea = document.querySelector('#message');
    const savedMessageParagraph = document.querySelector('#saved-message');

    const savedMessage = localStorage.getItem('message');
    if (savedMessage) {
        savedMessageParagraph.textContent = `Mesaj salvat: ${savedMessage}`;
    }

    saveMessageButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Oprirea propagării evenimentului
        const message = messageTextarea.value;
        localStorage.setItem('message', message);
        savedMessageParagraph.textContent = `Mesaj salvat: ${message}`;

        console.log('Mesajul a fost salvat.');
    });

    // document click
    document.addEventListener('click', function () {
        console.log('Document clicked');
    });

    // stop propagation
    saveMessageButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Oprirea propagării evenimentului
        console.log('Save button clicked');
    });

    // login logout cu local storage
    const loginForm = document.querySelector('#login-form');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.querySelector('#logout-button');
    const loginStatus = document.querySelector('#login-status');

    function updateLoginStatus() {
        const username = localStorage.getItem('username');
        if (username) {
            loginStatus.textContent = `Logged in as ${username}`;
            loginForm.style.display = 'none';
            logoutButton.style.display = 'block';
        } else {
            loginStatus.textContent = 'Not logged in';
            loginForm.style.display = 'block';
            logoutButton.style.display = 'none';
        }
    }

    loginButton.addEventListener('click', function () {
        console.log(1)
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        console.log('Attempting login with username:', username); 

        // fetch json
        fetch('users.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                console.log('Fetched users:', users);
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    localStorage.setItem('username', username);
                    updateLoginStatus();
                } else {
                    loginStatus.textContent = 'Invalid username or password';
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    });

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('username');
        updateLoginStatus();
    });

    //actualizare login
    updateLoginStatus();
});
document.addEventListener('DOMContentLoaded', function () {
    // adaugarea unui nou element
    if (window.location.pathname.includes('contact.html')) {
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            const newElement = document.createElement('p');
            newElement.textContent = 'Multumim pentru atentie!';
            contactSection.appendChild(newElement);
        }
    }
});