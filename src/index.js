import "./pages/index.css";
import { createCard, deleteCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getInitialCards,
  getProfileInfo,
  updateProfileInfo,
  createNewCard,
  deleteMyCard,
  updateAvatar,
} from "./scripts/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: profile
const profilePopup = document.querySelector(".popup_type_edit");
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);
// @todo: avatar
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.querySelector("[name=edit-avatar]");
const avatarLinkinput = document.querySelector("[name=link-avatar]");
// @todo: card
const formDeletePlace = document.forms["delete-place"];
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImageCard = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const cardNameInput = document.querySelector("[name=place-name]");
const cardLinkInput = document.querySelector("[name=link]");
const closeButtons = document.querySelectorAll(".popup__close");
const cardForm = document.querySelector("[name=new-place]");
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
let currentUserId;
let cardToDelete;

// @todo: Смена текста кнопки во время отправки запроса
function renderLoading(
  submitButton,
  isLoading,
  buttonText = "Сохранить",
  loadingText = "Сохранение...",
) {
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = buttonText;
  }
}

// @todo: Открыть попап просмотра карточки
function onCardClick(cardData) {
  popupImageCard.src = cardData.link;
  popupImageCard.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// @todo: Изменение данных в профиле
function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileData = {
    name: nameInput.value,
    about: descriptionInput.value,
  };
  const profileSubmitButton = profileForm.querySelector(".popup__button");
  renderLoading(profileSubmitButton, true);
  updateProfileInfo(profileData)
    .then((userData) => {
      ((profileTitle.textContent = userData.name),
        (profileDescription.textContent = userData.about));
      closeModal(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(profileSubmitButton, false));
}
// @todo: Открыть попап подтверждения удаления карты
function openDeleteConfirmationPopup(cardData, cardElement) {
  cardToDelete = {
    id: cardData._id,
    element: cardElement,
  };
  openModal(popupDeleteCard);
}
// @todo: Удаление карты
function confirmDeleteCard(evt) {
  evt.preventDefault();
  const submitButton = formDeletePlace.querySelector(".popup__button");
  renderLoading(submitButton, true);
  deleteMyCard(cardToDelete.id)
    .then(() => {
      deleteCard(cardToDelete.element);
      closeModal(popupDeleteCard);
      cardToDelete = null;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(submitButton, false, "Да", "Удаление...");
    });
}
// @todo: Изменение аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const profileData = {
    avatar: avatarLinkinput.value,
  };
  const submitButton = avatarForm.querySelector(".popup__button");
  renderLoading(submitButton, true);
  updateAvatar(profileData)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(submitButton, false));
}

// @todo: Закрытие модального окна кликом на крестик
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

// @todo: Добавление новой карточки
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const submitButton = cardForm.querySelector(".popup__button");
  renderLoading(submitButton, true);
  createNewCard(newCard)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        onCardClick,
        currentUserId,
        openDeleteConfirmationPopup,
      );
      placesList.prepend(cardElement);
      closeModal(addCardPopup);
      cardForm.reset();
      clearValidation(cardForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(submitButton, false));
});

// @todo: Открыть попап редактирования аватара
profileImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

// @todo: Открыть попап редактирования профиля
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profilePopup);
});

// @todo: Открыть попап добавления карточки
addCardButton.addEventListener("click", () => openModal(addCardPopup));

// @todo: Открыть попап редактирования данных профиля
profileForm.addEventListener("submit", handleFormSubmit);

// @todo: Открыть попап редактирования аватара
avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(validationConfig);

formDeletePlace.addEventListener("submit", confirmDeleteCard);
Promise.all([getProfileInfo(), getInitialCards()])
  .then((result) => {
    const { name, about, avatar, _id } = result[0];
    profileTitle.textContent = name;
    profileDescription.textContent = about;
    profileImage.style.backgroundImage = "url(" + avatar + ")";
    currentUserId = _id;
    result[1].forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        onCardClick,
        currentUserId,
        openDeleteConfirmationPopup,
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });
