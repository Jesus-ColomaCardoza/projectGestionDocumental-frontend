import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/HeaderWithButton.css'

const HeaderWithButton = ({textNav,textButton,typeButton,openModal}) => {
    return (
        <div className='container-list__header'>
            <h3 className='container-list__h3'>{textNav}</h3>
            <button type="button" className={`btn btn-${typeButton} me-1`} onClick={openModal}>
                <Link>
                    <i className="bi bi-plus text--white"></i>
                </Link>
                {textButton}
            </button>
        </div>)
}

export default HeaderWithButton