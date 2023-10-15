import '../stylesheets/Modal.css'

const Modal = ({ children, isOpen, closeModal }) => {
    const handleModalContainerClick = (e) => e.stopPropagation();
    return (
        <article className={`modal-custom ${isOpen ? 'is-open' : ''}`} onClick={closeModal}>
            <div className='modal-custom__container' onClick={handleModalContainerClick}>
                <button
                    className='modal-custom__close btn btn-light'
                    onClick={closeModal}
                >
                    X
                </button>
                {children}
            </div>

        </article>
    )
}

export default Modal