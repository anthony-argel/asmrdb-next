import Link from "next/link";
import { BiSearchAlt } from "react-icons/bi";

function Nav() {
  return (
    <nav className="bg-black text-white p-3 flex justify-between min-h-[5vh] ">
      <div className="flex gap-3 items-center">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/">
          <a>Channels</a>
        </Link>
        <Link href="/">
          <a>Tags</a>
        </Link>
        <Link href="/">
          <a>Discussion</a>
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        <form>
          <input
            className="p-1"
            type="text"
            id="search"
            name="search"
            placeholder="Search..."
          />
          <button>
            <BiSearchAlt size={"20px"}></BiSearchAlt>
          </button>
        </form>
        <Link href="/">
          <a>Login</a>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
