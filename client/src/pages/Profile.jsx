import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = async (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => {
          setProfileAvatarEdit(true);
        }}
        className="text-xs min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-100 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit
          close={() => {
            setProfileAvatarEdit(false);
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="my-4 grid gap-4">
        <div className="grid">
          <label>Name</label>
          <input
            className="p-2 bg-blue-50 outline-none border rounded focus-within:border-primary-200"
            type="text"
            placeholder="Enter Your Name"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 bg-blue-50 outline-none border rounded focus-within:border-primary-200"
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            className="p-2 bg-blue-50 outline-none border rounded focus-within:border-primary-200"
            type="text"
            id="mobile"
            placeholder="Enter Your Mobile Number"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>
        <button className="border rounded text-primary-200 hover:text-neutral-800 px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100">
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
