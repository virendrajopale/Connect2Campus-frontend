import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../../redux/Actions/StudentAction";
import { FaProjectDiagram, FaCalendarAlt } from "react-icons/fa";

const UpdateProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { project } = useSelector(state => state.profile);
    const { id } = useParams();

    useEffect(() => {
        // Fetch data or anything you need when the component mounts
    }, []);

    const p1 = project && project.projects && project.projects.find((proj) => proj._id === id);

    const [proj, setProj] = useState({
        title: p1?.title,
        description: p1?.description,
        start_date: p1?.start_date,
        end_date: p1?.end_date,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProj({ ...proj, [name]: value });
    };

    const handleSubmit = () => {
        dispatch(updateProject({ id, proj }));
        navigate('/user/profile');
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                        <FaProjectDiagram className="mr-2 text-indigo-600" />
                        Update Project
                    </h2>
                    <p className="mt-2 text-center text-sm ">
                        Title and description must have a minimum length of 5 characters
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium  flex items-center">
                            <FaProjectDiagram className="mr-2 text-indigo-600" />
                            Project Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="title"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={proj.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium  flex items-center">
                            <FaProjectDiagram className="mr-2 text-indigo-600" />
                            Project Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            autoComplete="description"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={proj.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="start_date" className="block text-sm font-medium  flex items-center">
                            <FaCalendarAlt className="mr-2 text-indigo-600" />
                            Starting Date
                        </label>
                        <input
                            type="Date"
                            name="start_date"
                            id="start_date"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={proj.start_date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="end_date" className="block text-sm font-medium  flex items-center">
                            <FaCalendarAlt className="mr-2 text-indigo-600" />
                            Ending Date
                        </label>
                        <input
                            type="Date"
                            name="end_date"
                            id="end_date"
                            required
                            className="mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                            value={proj.end_date}
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

export default UpdateProject;
