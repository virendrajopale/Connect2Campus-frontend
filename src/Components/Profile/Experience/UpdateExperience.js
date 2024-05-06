import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateExperience } from "../../../redux/Actions/StudentAction";
import { FaUserTie, FaBuilding, FaCalendarAlt } from "react-icons/fa";

const UpdateExperience = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { experience } = useSelector(state => state.profile);
    const { id } = useParams();

    useEffect(() => {
        // Fetch data or anything you need when the component mounts
    }, []);

    const p1 = experience && experience.Experience && experience.Experience.find((exp) => exp._id === id);

    const [exp, setExp] = useState({
        position: p1?.position,
        org: p1?.org,
        start_year: p1?.start_year,
        end_year: p1?.end_year,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExp({ ...exp, [name]: value });
    };

    const handleSubmit = () => {
        dispatch(updateExperience({ id, exp }));
        navigate('/myProfile');
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                        <FaUserTie className="mr-2 text-indigo-600" />
                        Update Experience
                    </h2>
                    <p className="mt-2 text-center text-sm ">
                        Title and description must have a minimum length of 5 characters
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium  flex items-center">
                            <FaUserTie className="mr-2 text-indigo-600" />
                            Position of Responsibility
                        </label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            autoComplete="position"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={exp.position}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="org" className="block text-sm font-medium  flex items-center">
                            <FaBuilding className="mr-2 text-indigo-600" />
                            Organization
                        </label>
                        <input
                            type="text"
                            name="org"
                            id="org"
                            autoComplete="org"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={exp.org}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="start_year" className="block text-sm font-medium  flex items-center">
                            <FaCalendarAlt className="mr-2 text-indigo-600" />
                            Starting Year
                        </label>
                        <input
                            type="Date"
                            name="start_year"
                            id="start_year"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={exp.start_year}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="end_year" className="block text-sm font-medium  flex items-center">
                            <FaCalendarAlt className="mr-2 text-indigo-600" />
                            Ending Year
                        </label>
                        <input
                            type="Date"
                            name="end_year"
                            id="end_year"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={exp.end_year}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateExperience;
