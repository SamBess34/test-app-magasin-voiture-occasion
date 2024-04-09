import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileButton = () => {
  const { data: session } = useSession();

  return (
    <Link href="/profile">
      <button className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 mr-2 mb-2 sm:mb-0">
        Mon profil
      </button>
    </Link>
  );
};

export default ProfileButton;
