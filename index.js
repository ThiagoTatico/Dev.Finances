const Modal = {
  open() {
    // ADD class "active" to the modalOverlay
    document.querySelector('.modalOverlay').classList.add('active')
  },

  close() {
    // REMOVE class "active" to the modalOverlay
    document.querySelector('.modalOverlay').classList.remove('active')
  }
}
