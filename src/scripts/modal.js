function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeESC);
  popup.addEventListener("click", closeOverlay);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeESC);
  popup.removeEventListener("click", closeOverlay);
}

function closeESC(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function closeOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

export { openModal, closeModal, closeESC, closeOverlay };
