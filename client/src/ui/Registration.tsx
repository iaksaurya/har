import { useState } from "react";
("./Login");
import Label from "./Label";
import { MdPhotoLibrary } from "react-icons/md";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import upload from "../lib/upload";
import { doc, setDoc } from "firebase/firestore";
import Login from "./Login";
import Container from "./Container";

const Registration = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e: any) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleRegistration = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { firstName, lastName, email, password }: any =
      Object.fromEntries(formData);
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      let imageUrl = null;
      if (avatar && avatar?.file) {
        imageUrl = await upload(avatar?.file);
      }
      await setDoc(doc(db, "users", res.user.uid), {
        firstName,
        lastName,
        email,
        avatar: imageUrl,
        id: res.user.uid,
      });
      setLogin(true);
    } catch (error: any) {
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email.";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter a password.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use. Try another email.";
          break;
        // Add more cases as needed
        default:
          errorMessage = "An error occurred. Please try again.";
      }
      console.log("Error", error);
      setErrMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
    <div className="" >
      {login ? (
        <Login setLogin={setLogin} />
      ) : (
        
        <div className="bg-[#dfdbdb] rounded-3xl ml-80 mr-80 flex-wrap ">
          
          <form
            onSubmit={handleRegistration}
            className=" pt-10 px-10 lg:px-0 text-black"
          >
            <div className=" pb-5 border ">
              <h2 className="text-lg  ml-10 mr-10 text-center font-semibold text-black uppercase leading-7">
                Sign Up
              </h2>
             
              {/* <p className="mt-1 text-sm leading-6 text-black">
                You need to provide required information to get register with
                us.
              </p> */}
            </div>
            <div className="">
            <div className=" pb-5 ml-10 mr-10 ">
              <div className="mt-5  grid grid-cols-1  gap-x-6 gap-y-5 sm:grid-cols-6 ">
               
                <div className=" sm:col-span-full">
                  <Label title="First name" htmlFor="firstName" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    className=" block w-full  border-0 bg-white py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-zinc-500 sm:text-sm sm:leading-6 mt-2 rounded-3xl "
                  />
                </div>
                <div className="sm:col-span-full">
                  <Label title="Last name" htmlFor="lastName" />
                  <input
                    type="text"
                    name="lastName"
                      placeholder="last name"
                    className="block w-full rounded-3xl border-0 bg-white py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-zinc-500 sm:text-sm sm:leading-6 mt-2"
                  />
                </div>
                <div className="sm:col-span-full">
                  <Label title="Email address" htmlFor="email" />
                  <input
                    type="email"
                    name="email"
                      placeholder="email"
                    className="block w-full rounded-3xl border-0 bg-white py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-zinc-500 sm:text-sm sm:leading-6 mt-2"
                  />
                </div>
                <div className="sm:col-span-full">
                  <Label title="Password" htmlFor="password" />
                  <input
                    type="password"
                    name="password"
                      placeholder="password"
                    className="block w-full rounded-3xl border-0 bg-white py-1.5 px-4 outline-none text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-zinc-500 sm:text-sm sm:leading-6 mt-2"
                  />
                </div>
                <div className="col-span-full">
                  <div className="mt-2 flex items-center gap-x-3">
                    <div className="flex-1">
                      <Label title="Cover photo" />
                      <div className="mt-2 flex justify-center rounded-lg  px-6 py-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 border-bg-[#dfdbdb]  rounded-full p-1">
                            {avatar?.url ? (
                              <img
                                src={avatar?.url}
                                alt="userImage"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                            //   <label htmlFor="file-upload">
                            //   <span className="relative cursor-pointer rounded-md px-2 py-1 bg-gray-900 font-semibold text-gray-200 hover:bg-gray-800">
                            //     Upload a file
                            //   </span>
                            //   <MdPhotoLibrary className="mx-auto h-full w-full text-gray-800" />
                            //   <input
                            //     type="file"
                            //     name="file-upload"
                            //     id="file-upload"
                            //     className="sr-only"
                            //     onChange={handleAvatar}
                            //   />
                            // </label>
                              <MdPhotoLibrary className="mx-auto h-full w-full text-gray-800" />
                            )}
                            
                          </div>
                          <div className="mt-4   items-center mb-1 text-sm leading-6 text-gray-400">
                            <label htmlFor="file-upload">
                              <span className="relative cursor-pointer rounded-md px-2 py-1 bg-gray-900 font-semibold text-gray-200 hover:bg-gray-800">
                                Upload a file
                              </span>
                              <input
                                type="file"
                                name="file-upload"
                                id="file-upload"
                                className="sr-only"
                                onChange={handleAvatar}
                              />
                            </label>
                            <p className="pl-1 text-gray-600">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            {errMsg && (
              <p className="bg-white/90 text-red-600 text-center py-1 rounded-2xl tracking-wide font-semibold">
                {errMsg}
              </p>
            )}
            <div className="ml-10 mr-10">
            <button
              disabled={loading}
              type="submit"
              className={`mt-5 w-full  rounded-3xl py-2 uppercase text-base font-bold tracking-wide text-white hover:text-white hover:bg-black duration-200 ${
                loading ? "bg-gray-500 hover:bg-gray-500" : "bg-zinc-900"
              }`}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
            </div>
          </form>
          
          <p className="text-sm leading-6 text-black text-center -mt-2 py-10">
            Already have an Account{" "}
            <button
              onClick={() => setLogin(true)}
              className="text-zinc-900 font-semibold underline underline-offset-2 decoration-[1px] hover:text-black duration-200"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
    </Container>
  );
};

export default Registration;
