import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [feed,setFeedData] = useState("");
    // const feed = useSelector((state) =>{state.feed});

    const getFeedData = async () => {
        try {
            let feedData = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
            dispatch(addFeed(feedData.data));
            setFeedData(feedData.data.data);
            console.log(feedData.data)
        } catch (err) {
            if (err.status == 401) {
                navigate('/login')
            };
        }
    }

    useEffect(() => {
        getFeedData();
    }, [])

    return feed && (
        <div className="flex justify-center items-center flex-col my-10">
            <UserCard user={feed[0]}/>
        </div>
    )
}

export default Feed;