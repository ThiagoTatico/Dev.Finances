const Modal = {
  open() {
    document.querySelector('.modalOverlay').classList.add('active')
  },

  close() {
    document.querySelector('.modalOverlay').classList.remove('active')
  }
}
