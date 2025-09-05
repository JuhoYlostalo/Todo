import { useState } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";

//Tämä komponenti välittää kaikki user tiedot muille
export default function UserProvider({children}) {

    //Haetaan selaimen muistista käyttäjänimi
    const userFromStorage = sessionStorage.getItem("user")

    const [user, setUser] = useState(userFromStorage ? JSON.parse(userFromStorage) : {email: "", password: ""
    })

    const signUp = async(email,password) => {

        const headers = {headers: {"Content-Type" : "application/json"}}

        //axiosin pitäisi osata itse stringifytä joten tämä turhaa
        await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, JSON.stringify({email, password}), headers)

        //Tässä ei sinänsä ole järkeä koska tämän jälkeen käyttäjä ohjataan heti kirjautumis sivulle
        setUser({ email })
    }

    const signIn = async (email,password) => {
        const headers = {headers: {"Content-Type" : "application/json"}}
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, JSON.stringify({email, password}), headers)
        setUser(response.data)
        sessionStorage.setItem("user",JSON.stringify(response.data))
    }

    return (
        <UserContext.Provider value={{user,setUser,signUp,signIn}}>
            {children}
        </UserContext.Provider>

    )
}