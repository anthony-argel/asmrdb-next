interface tagData {
    _id: string;
    name: string;
}

interface Props {
    tags: tagData[];
}

function LatestTags({ tags }: Props) {
    return (
        <div className="h-full bg-white p-4">
            <h2 className="text-center font-bold text-2xl">Latest Tags</h2>
            <hr></hr>
            {tags.map((value) => {
                return (
                    <p key={value._id} className="mt-4">
                        {value.name}
                    </p>
                );
            })}
        </div>
    );
}

export default LatestTags;
