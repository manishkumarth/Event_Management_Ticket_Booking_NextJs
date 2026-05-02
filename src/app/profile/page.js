"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const imageVariants = [
  "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
  "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcyJTbCVuG7IDwULRLRoUGgBqCSBQ7CZXytQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2Krpr7sdfhw-wzGqR_mRcYrvm_Jy8Jgr-A&s",
];

export default function Profile() {
  const { data: session, status } = useSession();

  const [realInput, setRealInput] = useState({ name: "", email: "" });
  const [inputs, setInputs] = useState({ name: "", email: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [profileImg, setProfileImg] = useState(imageVariants[0]);

  // Load user data from session
  useEffect(() => {
    if (session?.user) {
      const userName = session.user.name || "";
      const userEmail = session.user.email || "";
      const userImage = session.user.image || imageVariants[0];

      setRealInput({ name: userName, email: userEmail });
      setInputs({ name: userName, email: userEmail });
      setProfileImg(userImage);
      imageVariants.unshift(userImage)
    }
  }, [session]);

  const enableEdit = () => setIsEdit(true);

  const saveChanges = () => {
    setRealInput({ ...inputs });
    setIsEdit(false);
    // You can add API call here to update user in database
    alert("Profile updated successfully!");
  };

  const cancelEdit = () => {
    setInputs({ ...realInput });
    setIsEdit(false);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        Loading profile...
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        Please sign in to view your profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
          
          {/* Header */}
          <div className="bg-zinc-800 px-8 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            {!isEdit && (
              <button
                onClick={enableEdit}
                className="flex items-center gap-2 text-primary hover:text-white transition-colors"
              >
                <FaEdit className="text-xl" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center pt-8 pb-6 bg-zinc-900">
            <div className="relative">
              <img
                src={profileImg}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-zinc-700 object-cover shadow-lg"
              />
            </div>

            {isEdit && (
              <div className="mt-6">
                <p className="text-center text-sm text-gray-400 mb-3">Choose Profile Picture</p>
                <div className="flex gap-3 flex-wrap justify-center">
                  {imageVariants.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Avatar ${i}`}
                      onClick={() => setProfileImg(img)}
                      className={`w-14 h-14 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${
                        profileImg === img 
                          ? "border-primary scale-110" 
                          : "border-zinc-700 hover:border-zinc-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="px-8 pb-8 space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                disabled={!isEdit}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary disabled:opacity-75"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                disabled={!isEdit}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary disabled:opacity-75"
                placeholder="your@email.com"
              />
            </div>

            {/* Action Buttons */}
            {isEdit && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={cancelEdit}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-500 text-red-400 rounded-2xl hover:bg-red-500/10 transition-all"
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-2xl transition-all"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full mt-6 py-4 border border-red-600 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white font-medium transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}