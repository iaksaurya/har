import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth"; // Type import for User
import { auth } from "../lib/firebase";
import { store } from "../lib/store";
import Container from "../ui/Container";
import Registration from "../ui/Registration";
import UserInfo from "../ui/UserInfo";
import Loading from "../ui/Loading";

const Profile: React.FC = () => {
  const { currentUser, getUserInfo, isLoading } = store();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user: User | null) => {
      if (user?.uid) {
        getUserInfo(user.uid);
      }
    });
    return () => {
      unSub();
    };
  }, [getUserInfo]);

  return (
    <Container>
      {currentUser ? <UserInfo currentUser={currentUser} /> : <Registration />}
      {isLoading && <Loading />}
    </Container>
  );
};

export default Profile;
