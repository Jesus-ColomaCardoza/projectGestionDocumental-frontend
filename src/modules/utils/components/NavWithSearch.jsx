import SelectQuantityPages from "./SelectQuantityPages";

const NavWithSearch = ({ 
    nameSearch, 
    handleSearch, 
    setDataQuantity,
    setCurrentPage 
}) => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="bi bi-list"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <SelectQuantityPages 
                            setDataQuantity={setDataQuantity}
                            setCurrentPage={setCurrentPage}
                        />
                    </ul>
                    <div className="d-flex" role="search">
                        <label className="my-auto">Buscar:</label>
                        <input
                            className="form-control mx-2"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Search"
                            onChange={handleSearch}
                            value={nameSearch} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavWithSearch;