import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [gender, setGender] = useState(user.gender);
    const [age, setAge] = useState(user.age);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const [showMsg, setShowMsg] = useState(false);

    const updateProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                gender,
                photoUrl,
                age,
                about
            }, { withCredentials: true })
            dispatch(addUser(res.data.data));
            localStorage.setItem("isLoggedIn", false);
            setShowMsg(true);
            setTimeout(() =>{
                setShowMsg(false);
            }, 3000)
            setErrorMsg('');
        } catch (err) {
            const errMsg = err.response.data;
            setErrorMsg(errMsg);
        }
    }

    return (
        <div className="flex justify-center space-x-2 py-5">
            {showMsg && <div className="toast toast-bottom toast-right z-40">
                <div className="alert alert-success">
                    <span>Data updated successfully</span>
                </div>
            </div>}
            <div className="flex justify-center">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                        <h2 className="card-title">Update Profile</h2>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Update first name</legend>
                            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="input outline-none" placeholder="Enter first name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Update last name</legend>
                            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className="input outline-none" placeholder="Enter last name" />
                        </fieldset>
                        <div className="dropdown">
                            <legend className="fieldset-legend">Update gender</legend>
                            <div tabIndex={0} role="button" className="input">{gender}</div>
                            <ul tabIndex={0} onClick={(e) => setGender(e.target.innerText)} className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a>Male</a></li>
                                <li><a>Female</a></li>
                                <li><a>Others</a></li>
                            </ul>
                        </div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Update age</legend>
                            <input type="text" value={age} onChange={(event) => setAge(event.target.value)} className="input outline-none" placeholder="Enter age" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Update photoUrl</legend>
                            <input type="text" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} className="input outline-none" placeholder="Enter photo url" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Update About</legend>
                            <input type="text" value={about} onChange={(event) => setAbout(event.target.value)} className="input outline-none" placeholder="Enter About" />
                        </fieldset>
                        <p className="text-red-500">{errorMsg}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={updateProfile}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, gender, age, photoUrl, about }} />
        </div>
    )
};


export default Editprofile;