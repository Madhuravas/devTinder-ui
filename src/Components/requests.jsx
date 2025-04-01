import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequestData, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requestsData = useSelector((state) => state.requests);

    const getRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequestData(res.data.data));
        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    const sendRequestReply = async (reply, id) =>{
        try{
          const res = await axios.post(BASE_URL + `/connection/review/${reply}/${id}`, {}, {withCredentials:true});
          dispatch(removeRequest(id))
        }catch(err){
           console.log(err)
        }
    }

    return (
        requestsData &&
        <div className="flex items-center flex-col justify-center mt-10">
            <h2 className="text-2xl">Requests</h2>
            <div className="w-full">
                {requestsData.map(request => {
                    const { firstName, lastName, about, photoUrl } = request.fromUserId;
                    return (
                        <div key={request._id} className="bg-base-300 w-1/2 my-5 rounded-xl border px-10 py-4 m-auto flex justify-center items-center space-x-5">
                            <img alt="photo" className="h-[60px] w-[60px] rounded-full" src={photoUrl} />
                            <div className="w-[60%]">
                                <p>{firstName + " " + lastName}</p>
                                <p>{about}</p>
                            </div>
                            <div className="w-[30%] space-x-3">
                                <button onClick={() => sendRequestReply("rejected", request._id)} className="btn btn-primary">Reject</button>
                                <button onClick={() => sendRequestReply("accepted", request._id)} className="btn btn-secondary">Accept</button>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
};

export default Requests;