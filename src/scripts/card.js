// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template')
// @todo: Функция создания карточки
function createCard(cardData, deleteCardCallback, onCardClick) {
  const cardFragment = cardTemplate.content.cloneNode(true)
  const cardElement = cardFragment.querySelector('.card')
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  cardImage.src = cardData.link
  cardImage.alt = cardData.name
  cardTitle.textContent = cardData.name
  const deleteButton = cardElement.querySelector('.card__delete-button')
  deleteButton.addEventListener('click', () => deleteCardCallback(cardElement))
  cardImage.addEventListener('click', () => onCardClick(cardData))
  const likeButton = cardElement.querySelector('.card__like-button')
  likeButton.addEventListener('click', () => likeCard(likeButton))
  return cardElement
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove()
}
// @todo: Лайк карточки
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}

export { createCard, deleteCard}