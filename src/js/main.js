'use strict';

const   photoModal = document.querySelector('.photo-modal'),
        modalContent = photoModal.querySelector('.modal-content'),
        modalClose = photoModal.querySelector('.modal-close'),
        photos = document.querySelector('.photo-container');

function openPhoto(e) {
    const target = e.target;
    const photo = target.closest('.photo');

    e.preventDefault();

    if (photo) {
        toggleHidden(photoModal);
        renderPhoto(photo);
    }
    photoModal.addEventListener('click', closeModal);
    window.addEventListener('keyup', closeModal);
    console.log('Event listener added!');
}

function keyPress(event) {
    console.log(event);
}

function closeModal(e) {
    const target = e.target;

    if (e.target === photoModal || e.target === modalClose || e.key === 'Escape') {
    e.preventDefault();
    toggleHidden(photoModal);
    }
    photoModal.removeEventListener('click', closeModal);
    window.removeEventListener('keyup', closeModal);
    console.log('Event listener removed!');
}

function renderPhoto(photo) {
    //const cloned = photo.cloneNode(true);
    modalContent.innerHTML = photo.innerHTML;
}

function toggleHidden(element) {
    element && element.classList.toggle('hidden');
}

photos.addEventListener('click', openPhoto);


// $(window).click((e) => {
//     console.log('Клик по тэгу ' + $(e.target).prop("tagName"))
// });