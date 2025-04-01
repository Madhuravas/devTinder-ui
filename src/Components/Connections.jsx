import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../utils/connectionsSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connections);

    const getConnections = async () => {
        const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
        dispatch(setConnections(res.data.data));


    };

    useEffect(() => {
        getConnections();
    }, []);

    return (
        connections &&
        <div className="flex items-center flex-col justify-center mt-10">
            <h2 className="text-2xl">Connections</h2>
            <div className="w-full">
                {connections.map(connection => {
                    const { firstName, lastName, about, photoUrl } = connection;
                    return (
                        <div key={connection._id} className="bg-base-300 w-1/2 my-5 rounded-xl border px-10 py-4 m-auto flex justify-center items-center space-x-5">
                            <img alt="photo" className="h-[60px] w-[60px] rounded-full" src={photoUrl} />
                            <div className="w-[60%]">
                                <p>{firstName + " " + lastName}</p>
                                <p>{about}</p>
                            </div>
                            <div className="w-[30%] space-x-3">
                                <button className="btn btn-primary">Remove</button>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
};


export default Connections;