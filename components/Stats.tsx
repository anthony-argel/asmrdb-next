interface stats {
  channels: number;
  tags: number;
  users: number;
  reviews: number;
}

const Statistics = ({ channels, tags, users, reviews }: stats) => {
  return (
    <div className="bg-white ">
      <div className="flex flex-col">
        <p>Statistics</p>
        <hr></hr>
        <p>Channels: {channels}</p>
        <p>Tags: {tags}</p>
        <p>Users: {users}</p>
        <p>Reviews: {reviews}</p>
      </div>
    </div>
  );
};

export default Statistics;
