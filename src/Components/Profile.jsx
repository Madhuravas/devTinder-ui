import { useSelector } from "react-redux";
import Editprofile from "./EditProfile";

const Profile = () =>{
    const user = useSelector((state) => state.user)
    return(
       user && <div><Editprofile user={user}/></div>
    )
};

export default Profile;