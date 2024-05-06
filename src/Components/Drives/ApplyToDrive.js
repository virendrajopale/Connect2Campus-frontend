import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyProfile } from '../../redux/Actions/StudentAction';
import { applyToDrive } from '../../redux/Actions/DriveAction';
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { GrCompliance } from "react-icons/gr";
import PopUp from '../../Pages/PopUp';
import toast from 'react-hot-toast';

const ApplyToDrive = () => {
    const dispatch = useDispatch();
    const { profile,status,error } = useSelector(state => state.profile);
    const navigate = useNavigate();
    const { id } = useParams();
   
    const [msg,setMsg]=useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchMyProfile());
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchData();
    }, [dispatch]);

    const ApplyDrive = () => {
        if(profile && profile.Education && profile.Education.Array.length === 0 ){
            return  toast((t) => (
                <span>
                  Complete Your <b>Profile</b>
                  <button className='border p-2 rounded-md' onClick={() => { navigate('/user/profile'); toast.dismiss(t.id)}}>
                    Edit
                  </button>
                </span>
            ));
        }
        dispatch(applyToDrive(id))
            .unwrap()
            .then((data)=>{
                toast.success("Applied Successfully")
                navigate('/drives');
            })
            .catch((err)=>{
                console.log(err)
                if(err && err.response.status === 403){
                    toast.error("Sorry For Inconvenience,This is Server Problem We will Get Back To You")
                }
                if(err.response.status === 401){
                    toast.error("Not Eligible to apply to this Drive")
                }
                if(err.response.status === 404){
                    toast.error("Drive Is Not Applicable")
                }
            })
    };

    return (
        <>
            <div className="max-w-md mx-auto bg-white/30 backdrop-blur-sm text-white shadow-lg rounded-lg overflow-hidden my-16">
                <div className="md:flex">
                    <div className="w-full flex flex-col gap-5 p-4">
                        <div className="flex items-center justify-center gap-3">
                            <FaUserAlt className="" />
                            <h2 className="text-lg  font-medium">Student Profile</h2>
                        </div>
                        <div className="  mt-2 flex flex-col gap-8 text-xl">
                            <div className="flex items-center">
                                <FaEnvelope className="" />
                                <span className="ml-2">{profile && profile.email}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <FaPhoneAlt className="" />
                                <span className="ml-2">{profile && profile.mob_no}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <FaGraduationCap className="" />
                                <span className="ml-2">{profile && profile.Education.Array[0].title}:</span>
                                <span className="ml-1">{profile && profile.Education.Array[0].percentage}</span>
                            </div>
                            {profile && profile.Education.Array[1] && (
                                <div className="flex items-center mt-2">
                                    <FaGraduationCap className="" />
                                    <span className="ml-2">{profile && profile.Education.Array[1].title}:</span>
                                    <span className="ml-1">{profile && profile.Education.Array[1].percentage}</span>
                                </div>
                            )}
                            {profile && profile.Education.Array[2] && (
                                <div className="flex items-center mt-2">
                                    <FaGraduationCap className="" />
                                    <span className="ml-2">{profile && profile.Education.Array[0].title}:</span>
                                    <span className="ml-1">{profile && profile.Education.Array[2].percentage}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => navigate('/user/profile')}
                                className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={ApplyDrive}
                                className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplyToDrive;
