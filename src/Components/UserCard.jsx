import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const {_id, firstName, lastName, photoUrl, about, gender, age} = user;
    const dispatch = useDispatch();
    

    const sendConnection = async (status, id) =>{
        try{
            await axios.post(BASE_URL + "/connection/send/" + status +"/"+ id, {}, {withCredentials:true});
            dispatch(removeFeed(_id));
        }catch(err){
            console.log(err)
        }
        
    };

    return (
        <div className="card bg-base-300 w-75 shadow-sm min-h-[500px] max-h-auto">
            <figure>
                <img
                    src={photoUrl}
                    alt="profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {gender && age && <p>{gender} {age}</p>}
                {about && <p>{about}</p>}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => sendConnection("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => sendConnection("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
};


export default UserCard;