import { deleteLikeCard, deleteMyCard, likeCard } from "./api";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");
// @todo: Функция создания карточки
function createCard(cardData, onCardClick, currentUserId, onDeleteClick) {
  const cardFragment = cardTemplate.content.cloneNode(true);
  const cardElement = cardFragment.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikes = cardElement.querySelector(".card__numbers-of-likes");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;
  const isLiked = cardData.likes.some((likedUser) => {
    return likedUser._id === currentUserId;
  });
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      onDeleteClick(cardData, cardElement);
    });
  }
  cardImage.addEventListener("click", () => onCardClick(cardData));
  likeButton.addEventListener("click", () => {
    const isLiked = cardData.likes.some((likedUser) => {
      return likedUser._id === currentUserId;
    });

    if (isLiked) {
      deleteLikeCard(cardData)
        .then((updatedCard) => {
          cardData.likes = updatedCard.likes;
          cardLikes.textContent = updatedCard.likes.length;
          const isLikedUpdate = updatedCard.likes.some((likedUser) => {
            return likedUser._id === currentUserId;
          });
          if (!isLikedUpdate) {
            likeButton.classList.remove("card__like-button_is-active");
          }
        })
        .catch((err) => console.log(err));
    } else {
      likeCard(cardData)
        .then((updatedCard) => {
          cardData.likes = updatedCard.likes;
          cardLikes.textContent = updatedCard.likes.length;
          const isLikedUpdate = updatedCard.likes.some((likedUser) => {
            return likedUser._id === currentUserId;
          });
          if (isLikedUpdate) {
            likeButton.classList.add("card__like-button_is-active");
          }
        })
        .catch((err) => console.log(err));
    }
  });
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCard };
