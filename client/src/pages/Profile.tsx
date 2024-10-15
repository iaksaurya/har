import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { store } from "../lib/store";
import Container from "../ui/Container";
import Registration from "../ui/Registration";
import UserInfo from "../ui/UserInfo";
import Loading from "../ui/Loading";

// Update UserType to make 'address' optional
type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  id: string;
  address?: string; // Make 'address' optional
};

const Profile: React.FC = () => {
  // Update store return types
  const { currentUser, getUserInfo, isLoading } = store() as {
    currentUser: UserType | null;
    getUserInfo: (uid: string) => void;
    isLoading: boolean;
  };

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
      {currentUser ? (
        <UserInfo currentUser={currentUser} />
      ) : (
        <Registration />
      )}
      {isLoading && <Loading />}
    </Container>
  );
};

export default Profile;
