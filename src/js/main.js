'use strict';

const photoModal = document.querySelector('.photo-modal'),
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

}

function closeModal(e) {
    const target = e.target;

    if (e.target === photoModal || e.target === modalClose) {

    e.preventDefault();
    toggleHidden(photoModal);
    }
}

function renderPhoto(photo) {
    //const cloned = photo.cloneNode(true);
    modalContent.innerHTML = photo.innerHTML;
}

function toggleHidden(element) {
    element && element.classList.toggle('hidden');
}

photos.addEventListener('click', openPhoto);
photoModal.addEventListener('click', closeModal);
