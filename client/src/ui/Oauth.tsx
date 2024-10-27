import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../lib/firebase";  // Make sure db is correctly imported
import { doc, setDoc } from "firebase/firestore"; // For storing user data
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user is already in the database; if not, store user data
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
        firstName: user.displayName,
        // lastName: user.displayName,
        email: user.email,
        // photoURL: user.photoURL,
        avatar: user.photoURL,
        id: user.uid,
      }, { merge: true }); // merge: true updates existing data without overwriting
      
      console.log("User signed in and data stored successfully.");

      // Navigate to the home page or other dashboard page
      navigate('/profile');
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-slate-950 w-full rounded-3xl mt-5 text-white gap-5 p-3 flex text-center uppercase hover:opacity-95"
      >
        <div className="text-center flex flex-wrap gap-5">
          <FcGoogle className="w-5 h-5 place-items-center ml-44" />
          Continue with Google
        </div>
      </button>
    </div>
  );
}
