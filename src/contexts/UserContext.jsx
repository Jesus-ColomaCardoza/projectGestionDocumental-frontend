import { createContext, useState } from "react";


const UserContext = createContext();

//we can declare initial varibles

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false)


    const handleUser = (data) => {
        setUser(data)
    }
    const handleAuth = (value) => {
        setIsAuth(value)
    }

    const data = { user, handleUser, isAuth, handleAuth }

    return (
        <UserContext.Provider value={data}>{children}</UserContext.Provider>
    );
};

export { UserProvider };
export default UserContext;