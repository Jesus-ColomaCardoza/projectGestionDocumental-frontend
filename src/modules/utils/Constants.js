const SERVER_URL=import.meta.env.VITE_SERVER_URL
const CLIENT_URL=import.meta.env.VITE_CLIENT_URL

const AREA={
    GETLIST:'/area/getlist/',
    CREATE:'/area/create/',
    GET:'/area/get/',
    UPDATE:'/area/update/',
    DELETE:'/area/delete/',
}

export{
    SERVER_URL,
    CLIENT_URL,
    AREA
}