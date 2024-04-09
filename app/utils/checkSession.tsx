import { useSession } from "next-auth/react";

function checkSession() {
  const { data: session } = useSession();
  return session;
}

export default checkSession;
