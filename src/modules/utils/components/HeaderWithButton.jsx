import React from 'react'
import '../stylesheets/HeaderWithButton.css'

const HeaderWithButton = ({ textNav, textButton, typeButton, openModal }) => {
    return (
        <div className='container-list__header'>
            <h3 className='container-list__h3'>{textNav}</h3>
            <button type="button" className={`btn btn-${typeButton} me-1`} onClick={openModal}>
                <i className="bi bi-plus text--white"></i>
                {textButton}
            </button>
        </div>)
}

export default HeaderWithButton