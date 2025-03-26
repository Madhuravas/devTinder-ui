const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, about, gender, age} = user;
    return (
        <div className="card bg-base-300 w-75 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {about && <p>{about}</p>}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
};


export default UserCard;