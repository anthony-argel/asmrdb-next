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
                <hr></hr>
                {tags
                    ? tags.map((value) => {
                          return (
                              <p key={value._id}>
                                  <Link href={"/tag/" + value._id + "/1"}>
                                      <a className="text-blue-600 underline">
                                          {value.name}
                                      </a>
                                  </Link>
                              </p>
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
