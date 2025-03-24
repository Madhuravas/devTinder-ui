import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            const res = await axios.post( BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });
            console.log(res.data.data);
            dispatch(addUser(res.data.data));
            navigate("/profile")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Login</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter your email</legend>
                        <input type="text" value={emailId} onChange={(event) => setEmailId(event.target.value)} className="input outline-none" placeholder="Enter Eamil ID" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter your password</legend>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input outline-none" placeholder="Enter Password" />
                    </fieldset>
                    <div className="card-actions justify-end">
                        <button onClick={onSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;