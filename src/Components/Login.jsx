import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [isSingUp, setIsSignUp] = useState(false);

    const onSubmitLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });
            dispatch(addUser(res.data.data));
            localStorage.setItem("isLoggedIn", true);
            navigate("/feed")
        } catch (err) {
            const errMsg = err.response.data;
            setErrorMsg(errMsg);
        }
    };

    const onSubmitSignin = async () =>{
        try{
           const res = await axios.post(BASE_URL + "/signup", {
            firstName,
            lastName,
            emailId,
            password
           }, {withCredentials:true});
           dispatch(addUser(res.data.data));
           localStorage.setItem("isLoggedIn", true);
           navigate("/profile")
        }catch(err){
            const errMsg = err.response.data;
            setErrorMsg(errMsg);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === 'true') {
            return navigate('/feed')
        }
    }, [])

    return (
        <div className="flex justify-center mt-10">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">{isSingUp ? "Sign up" : "Login"}</h2>
                    {isSingUp && <><fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Firstname</legend>
                        <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="input outline-none" placeholder="Enter Firstname" />
                    </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Enter Lastname</legend>
                            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className="input outline-none" placeholder="Enter lastname" />
                        </fieldset>
                    </>}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter your email</legend>
                        <input type="text" value={emailId} onChange={(event) => setEmailId(event.target.value)} className="input outline-none" placeholder="Enter Eamil ID" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter your password</legend>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input outline-none" placeholder="Enter Password" />
                    </fieldset>
                    <p className="text-red-500">{errorMsg}</p>
                    <div className="card-actions justify-center">
                        <button onClick={isSingUp ? onSubmitSignin : onSubmitLogin} className="btn btn-primary">Submit</button>
                    </div>
                    <p onClick={() => setIsSignUp(prevVal => !prevVal)} className="cursor-pointer text-center">{!isSingUp ? "New user?, signup here" : "Existing user?, login here"}</p>
                </div>
            </div>
        </div>
    )   
}

export default Login;