import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () =>{
    try{
      await axios.post(BASE_URL + "/logout", {}, {withCredentials:true});
      navigate("/login");
      localStorage.setItem("isLoggedIn", "false");
      dispatch(removeUser());
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1 mx-5">
        <Link to="/" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
      </div>
      {user && (<div className="flex gap-2 mx-10 items-center">
        <p className="mr-3">Welcome {user.firstName}</p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="userprofile"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>)}
    </div>
  );
};

export default Navbar;
