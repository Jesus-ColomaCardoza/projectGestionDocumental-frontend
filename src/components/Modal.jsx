import '../stylesheets/Modal.css'

const Modal = ({ children, title, isOpen, closeModal, size }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    <article className={`modal-custom ${isOpen ? 'is-open' : ''}`} onClick={closeModal}>
      <div className={`modal-custom__container ${size==''? ' ':'modal-custom__container--'+size}`} onClick={handleModalContainerClick}>
        <button
          className={`modal-custom__close btn btn-light`}
          onClick={closeModal}
        >
          X
        </button>
        <h3 className='mb-4 text-center'>{title}</h3>
        {children}
      </div>

    </article>
  )
}

export default Modal