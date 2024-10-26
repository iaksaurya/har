import  { useState } from "react";
import toast from "react-hot-toast";
import { UserTypes } from "../../type";
import { auth } from "../lib/firebase";
import Container from "./Container";
import { doc, updateDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../lib/firebase"; // Import your initialized Firestore instance (db)



const UserInfo = ({ currentUser }: UserTypes) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [address, setAddress] = useState(currentUser?.address || "");

  const handleProfileSave = async () => {
    try {
      const userRef = doc(db, "users", currentUser.id); // Reference to the user's document
      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
      });
      setIsEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };
  

  const handleAddressSave = async () => {
    try {
      const userRef = doc(db, "users", currentUser.id); // Reference to the user's document
      await updateDoc(userRef, {
        address: address,
      });
      setIsEditingAddress(false);
      toast.success("Address updated successfully!");
    } catch (error) {
      toast.error("Failed to update address. Please try again.");
      console.error("Error updating address:", error);
    }
  };

  return (
    <Container className="py-5 text-black">
      <div className="relative isolate overflow-hidden bg-[#dfdbdb] px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-16 place-items-center ml-80 mr-80">
        <div>    
             <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
                  Welcome back, dear{" "}
                  <span className="underline underline-offset-2 decoration-[1px] font-medium">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </span>
                </h2>
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10 mt-10">
          <img
            src={
              currentUser?.avatar
                ? currentUser?.avatar
                : "https://i.ibb.co/mJRkRRV/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
            }
            alt="userImage"
            className="w-40 h-40 rounded-full border border-gray-700 object-cover p-1"
          />
            <p className="text-start mt-3 max-w-lg text-base leading-6 text-black">
                We're thrilled to see you again. We hope you're ready for new experiences and exciting updates. If you need anything, we're here to help. Let's continue where you left off and make the most of your journey with us!"
                </p>
          </div>
          <div className="text-start flex-1">
            {isEditingProfile ? (
              <div>
                <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
                  Edit Profile
                </h2>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full p-2 mt-2 text-gray-900 rounded-md"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full p-2 mt-2 text-gray-900 rounded-md"
                  placeholder="Last Name"
                />
                <button
                  onClick={handleProfileSave}
                  className="mt-4 rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Save Profile
                </button>
              </div>
            ) : (
              <>
                {/* <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
                  Welcome back, dear{" "}
                  <span className="underline underline-offset-2 decoration-[1px] font-medium">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </span>
                </h2> */}
                {/* <p className="text-start mt-3 max-w-3xl text-base leading-6 text-black">
                We're thrilled to see you again. We hope you're ready for new experiences and exciting updates. If you need anything, we're here to help. Let's continue where you left off and make the most of your journey with us!"
                </p> */}
              </>
            )}
          </div>
        </div>

      

        <div className="mt-10 flex items-center gap-x-5 px-4">
          {isEditingAddress ? (
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
                Edit Address
              </h2>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full p-2 mt-2 text-black rounded-md"
                placeholder="Enter your address in city... ,District....., state...,country...,pincode..."
              />
              <button
                onClick={handleAddressSave}
                className="mt-4 rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-black hover:bg-gray-100"
              >
                Save Address
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsEditingProfile(true)}
                className="rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsEditingAddress(true)}
                className="rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                Add Address
              </button>
              <button
                onClick={() => auth.signOut()}
                className="rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <div className="text-start flex-1 place-items-center">
            <h2 className="text-xl  tracking-tight sm:text-4xl ml-32 mt-5">
               {/* dear{" "} */}
               Your Address
              {/* <span className="underline underline-offset-2 decoration-[1px] font-medium">
                {currentUser?.address} 
              </span> */}
            </h2>
            <p className="text-start *:mt-6 max-w-3xl text-base mt-3 leading-6 text-black ml-32">
            {currentUser?.address} 
            </p>
          </div>

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </Container>
  );
};

export default UserInfo;



// import toast from "react-hot-toast";
// import { UserTypes } from "../../type";
// import { auth } from "../lib/firebase";
// import Container from "./Container";

// const UserInfo = ({ currentUser }: UserTypes) => {
//   console.log(currentUser);

//   return (
//     <Container className="py-5 text-white">
//       <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-16">
//         <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10">
//           <img
//             src={
//               currentUser?.avatar
//                 ? currentUser?.avatar
//                 : "https://i.ibb.co/mJRkRRV/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
//             }
//             alt="userImage"
//             className="w-40 h-40 rounded-full border border-gray-700 object-cover p-1"
//           />
//           <div className="text-start flex-1">
//             <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
//               Welcome back, dear{" "}
//               <span className="underline underline-offset-2 decoration-[1px] font-medium">
//                 {currentUser?.firstName} {currentUser?.lastName}
//               </span>
//             </h2>
//             <p className="text-start *:mt-6 max-w-3xl text-base mt-3 leading-6 text-gray-300">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//               Suscipit, minus rem. Quaerat natus in sit cupiditate expedita odio
//               at sed saepe quos? Maiores, labore suscipit rerum ipsa iste eius
//               voluptates. Dolore laboriosam aut alias iusto quidem
//               necessitatibus quibusdam soluta in enim veritatis, commodi
//               voluptatem inventore iste harum est id autem.
//             </p>
//           </div>
//         </div>
//         <div className="mt-10 flex items-center gap-x-5 px-4">
//           <button
//             onClick={() =>
//               toast.error("Edit profile option available to pro version!")
//             }
//             className="rounded-md bg-white px-8 py-2.5 text-sm font-semibold  text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//           >
//             Edit profile
//           </button>
//           <button
//             onClick={() =>
//               toast.error("Add Address option available to pro version!")
//             }
//             className="rounded-md bg-white px-8 py-2.5 text-sm font-semibold  text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//           >
//             Add Address
//           </button>
//           <button
//             onClick={() => auth.signOut()}
//             className="rounded-md bg-white px-8 py-2.5 text-sm font-semibold  text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//           >
//             Logout
//           </button>
//         </div>
//         <svg
//           viewBox="0 0 1024 1024"
//           className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
//           aria-hidden="true"
//         >
//           <circle
//             cx={512}
//             cy={512}
//             r={512}
//             fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
//             fillOpacity="0.7"
//           />
//           <defs>
//             <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
//               <stop stopColor="#7775D6" />
//               <stop offset={1} stopColor="#E935C1" />
//             </radialGradient>
//           </defs>
//         </svg>
//       </div>
//     </Container>
//   );
// };

// export default UserInfo;