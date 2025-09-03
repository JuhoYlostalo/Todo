import {Link,useNavigate} from "react-router-dom"
import { useUser } from "../context/useUser.jsx"

export const AuthenticationMode = Object.freeze({
    SignIn: "Login",
    SignUp: "Signup" 
})

export default function Authentication({authenticationMode}){
    const {user,setUser,signUp,signIn} = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const signFunction = authenticationMode === AuthenticationMode.SignUp ? signUp : signIn

        signFunction(user.email, user.password).then(() => {
            navigate(authenticationMode === AuthenticationMode.SignUp ? "/signin" : "/")
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            <h3>{authenticationMode === AuthenticationMode.SignIn ? "Sign in" : "Sign up"}</h3>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input placeholder="Email" value={user.email} onChange={e => setUser({...user,email: e.target.value})} />
                <label>Password</label>
                <input placeholder="Password" type="password" value={user.password} onChange={e => setUser({...user,password: e.target.value})} />
                <button type="submit">{AuthenticationMode === AuthenticationMode.SignIn ? "Login":"Submit"}</button>
                <Link to={authenticationMode === AuthenticationMode.SignIn ? "/signup": "/signin"}>
                    {authenticationMode === AuthenticationMode.SignIn ? "No account? Sign Up" : "Already have an account? Sign in"}
                </Link>
            </form>
        </div>
    )
}