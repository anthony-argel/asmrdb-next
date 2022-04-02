import { GetServerSideProps } from "next";
import Link from "next/link";

interface tagData {
    _id: string;
    name: string;
}

interface Props {
    tags: tagData[];
}

const Tags = ({ tags }: Props) => {
    return (
        <>
            <div className="bg-white p-4 min-h-[98vh]">
                <h1 className="font-bold text-3xl text-center">Tags</h1>
                <hr className="mb-4"></hr>
                {tags
                    ? tags.map((value) => {
                          return (
                              <Link
                                  key={value._id}
                                  href={"/tag/" + value._id + "/1"}
                              >
                                  <a className="text-blue-600 m-1 border p-2 bg-gray-200 inline-block">
                                      {value.name}
                                  </a>
                              </Link>
                          );
                      })
                    : null}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    let tags: tagData[] = [];

    let url = "https://dry-hollows-28901.herokuapp.com/tag";
    await fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((res) => {
            if (res) {
                tags = res.approved;
            }
        });

    return {
        props: {
            tags: tags,
        },
    };
};

export default Tags;
