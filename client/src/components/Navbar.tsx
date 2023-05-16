import Link from 'next/link';
import Loading from '@/components/Loading';

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 fixed z-10">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Meegu
        </Link>
      </div>
      <div className="navbar-center">
        <Loading />
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
