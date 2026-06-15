import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard} from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const nameInput = document.querySelector('.popup__input_type_name')
const descriptionInput = document.querySelector('.popup__input_type_description')

const profilePopup = document.querySelector('.popup_type_edit')
const addCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')

const profileForm = document.querySelector('[name="edit-profile"]')

const cardNameInput = document.querySelector('[name=place-name]')
const cardLinkInput = document.querySelector('[name=link]')
// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard, onCardClick)
  placesList.append(cardElement)
})
// @todo: Открыть попап редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button')
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  descriptionInput.value = profileDescription.textContent
  openModal(profilePopup)
})


// @todo: Открыть попап добавления карточки
const addCardButton = document.querySelector('.profile__add-button')
addCardButton.addEventListener('click', () => openModal(addCardPopup))
// @todo: Открыть попап просмотра карточки
const popupImageCard = document.querySelector('.popup__image')
const popupImageCaption = document.querySelector('.popup__caption')

function onCardClick (cardData) {
  popupImageCard.src = cardData.link
  popupImageCard.alt = cardData.name
  popupImageCaption.textContent = cardData.name
  openModal(imagePopup)
}

// @todo: Изменение данных в профиле
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
    closeModal(profilePopup)
}
profileForm.addEventListener('submit', handleFormSubmit)

// @todo: Закрытие модального окна кликом на крестик
const closeButtons = document.querySelectorAll('.popup__close')

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup')
    closeModal(popup)
  })
})


// @todo: Добавление новой карточки
const cardForm = document.querySelector('[name=new-place]')
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  }
  const cardElement = createCard(newCard, deleteCard, onCardClick)
  placesList.prepend(cardElement)
  closeModal(addCardPopup)
  cardForm.reset()
    
})

