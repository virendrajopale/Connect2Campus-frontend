import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { displayEducation, updateEducation } from "../../../redux/Actions/StudentAction";
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaPercentage } from "react-icons/fa";

const UpdateEducation = () => {
    const navigate = useNavigate();
    const { education } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const { pid, id } = useParams();

    useEffect(() => {
        dispatch(displayEducation(pid));
    }, [dispatch, pid]);

    const p1 = education && education.educations && education.educations.find((edu) => edu._id === id);

    const [edu, setEdu] = useState({
        title: p1?.title,
        school: p1?.school,
        start_year: p1?.start_year,
        end_year: p1?.end_year,
        percentage: p1?.percentage
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEdu({ ...edu, [name]: value });
    };

    const handleSubmit = () => {
        dispatch(updateEducation({ id, edu }));
        navigate('/user/profile');
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                        <FaGraduationCap className="mr-2 text-indigo-600" />
                        Update Education
                    </h2>
                    <p className="mt-2 text-center text-sm ">
                        Title and description must have a minimum length of 5 characters
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
            <label htmlFor="title" className="block text-sm font-medium  flex items-center">
              <FaGraduationCap className="mr-2 text-indigo-600" />
              Education Level
            </label>
            <select
              name="title"
              id="title"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
              value={edu.title}
              onChange={handleInputChange}
              required
            >
              <option value="">{edu.title}</option>
              <option value="PhD">PhD</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Graduation">Graduation</option>
              <option value="Intermediate (12th)">Intermediate (12th)</option>
              <option value="High School (10th)">High School (10th)</option>
            </select>
          </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium  flex items-center">
                            <FaGraduationCap className="mr-2 text-indigo-600" />
                            School/College 
                        </label>
                        <input
                            type="text"
                            name="school"
                            id="school"
                            autoComplete="school"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={edu.school}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
            <label htmlFor="start_year" className="block text-sm font-medium  flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              Starting Year
            </label>
            <input
              type="number"
              name="start_year"
              id="start_year"
              required
              className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
              value={edu.start_year}
              onChange={handleInputChange}
              placeholder="Enter Starting Year"
              min={1900}
              max={new Date().getFullYear() + 1}
            />
          </div>
          <div>
            <label htmlFor="end_year" className="block text-sm font-medium  flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              Ending Year (completed or expecting to complete)
            </label>
            <input
              type="number"
              name="end_year"
              id="end_year"
              required
              className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
              value={edu.end_year}
              onChange={handleInputChange}
              placeholder="Enter Ending Year"
              min={1900}
              max={new Date().getFullYear() + 5}
            />
          </div>
          <div>
            <label htmlFor="percentage" className="block text-sm font-medium  flex items-center">
              <FaPercentage className="mr-2 text-indigo-600" />
              Overall Percentage/CGPA
            </label>
            <input
              type="number"
              name="percentage"
              id="percentage"
              min="0"
              max="100"
              required
              className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
              value={edu.percentage}
              onChange={handleInputChange}
            />
          </div>
                    {/* Add other input fields similar to AddEducation component */}
                    {/* Remember to adjust the values and event handlers accordingly */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateEducation;
