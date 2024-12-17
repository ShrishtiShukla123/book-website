// Global Variables

const navLinks = document.querySelectorAll('nav a');
const heroButton = document.querySelector('.hero button');
const featuredBooks = document.querySelectorAll('.featured li');
const adoptForm = document.querySelector('.book-catalog form');
const adoptButton = document.querySelector('.book-catalog button');
const donateForm = document.querySelector('.donation-form form');
const donateButton = document.querySelector('.donation-form button');

// Event Listeners

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Add active class to current link
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

heroButton.addEventListener('click', () => {
    // Scroll to featured section
    document.querySelector('.featured').scrollIntoView({ behavior: 'smooth' });
});

featuredBooks.forEach(book => {
    book.addEventListener('click', () => {
        // Open book details modal
        const modal = document.querySelector('.book-modal');
        modal.classList.add('open');
        modal.querySelector('h2').textContent = book.querySelector('h3').textContent;
        modal.querySelector('p').textContent = book.querySelector('p').textContent;
    });
});

adoptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validate form data
    const formData = new FormData(adoptForm);
    if (formData.get('genre') === '' || formData.get('author') === '') {
        alert('Please fill in all fields');
        return;
    }
    // Submit form data to server
    fetch('/adopt', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

adoptButton.addEventListener('click', () => {
    // Open adopt form modal
    const modal = document.querySelector('.adopt-modal');
    modal.classList.add('open');
});

donateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validate form data
    const formData = new FormData(donateForm);
    if (formData.get('book-title') === '' || formData.get('author') === '') {
        alert('Please fill in all fields');
        return;
    }
    // Submit form data to server
    fetch('/donate', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

donateButton.addEventListener('click', () => {
    // Open donate form modal
    const modal = document.querySelector('.donate-modal');
    modal.classList.add('open');
});

// Modal Close Button

const modalCloseButtons = document.querySelectorAll('.modal-close');
modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Close modal
        const modal = button.parentNode.parentNode;
        modal.classList.remove('open');
    });
});

// Ensure the document is ready before adding event listeners
document.addEventListener("DOMContentLoaded", function () {

    // Select all "Adopt" buttons and add an event listener to each one
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    
    adoptButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the book's title and price from the data attributes of the clicked button
            const bookTitle = this.getAttribute('data-book-title');
            const bookPrice = this.getAttribute('data-book-price');

            // Populate the hidden form fields with the selected book's details
            document.getElementById('book-title').value = bookTitle;
            document.getElementById('book-price').value = bookPrice;

            // Show the adoption form by changing its display style
            document.getElementById('adoption-form-section').style.display = 'block';
        });
    });

    // Event listener for the "Cancel" button to hide the form without submitting
    document.getElementById('cancel-adopt').addEventListener('click', function () {
        document.getElementById('adoption-form-section').style.display = 'none';
    });

    // Event listener for the form submission
    document.getElementById('adoption-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Capture the form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const bookTitle = document.getElementById('book-title').value;
        const bookPrice = document.getElementById('book-price').value;

        // Log the adoption details (replace with an API call to save data)
        console.log(`Adoption details:
            Name: ${name}
            Email: ${email}
            Address: ${address}
            Book: ${bookTitle}
            Price: $${bookPrice}`);

        // Hide the adoption form after submission
        document.getElementById('adoption-form-section').style.display = 'none';

        // Optionally, show a success message or redirect user
        alert('Thank you for adopting the book!');
    });
});

// script.js

// Add event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        const email = form.email.value;
        const password = form.password.value;

        // Basic validation
        if (!email || !password) {
            alert("Both email and password are required!");
            event.preventDefault(); // Prevent form submission if validation fails
        } else if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            event.preventDefault(); // Prevent form submission if email is invalid
        }
    });
});

// Validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
