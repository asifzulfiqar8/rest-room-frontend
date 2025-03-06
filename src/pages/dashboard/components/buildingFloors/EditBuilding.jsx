import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBuilding = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const { id } = useParams();

    const navigate = useNavigate();

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Create a FormData object to hold the form data
        const formData = new FormData();
        const formElements = e.target.elements;

        // Append form fields to the FormData object
        formData.append("buildingName", formElements.buildingName.value);
        formData.append("buildingType", formElements.buildingType.value);
        formData.append("buildingLocation", formElements.buildingLocation.value);
        formData.append("buildingArea", formElements.buildingArea.value);
        formData.append("totalFloors", formElements.totalFloors.value);
        formData.append("totalRestrooms", formElements.totalRestrooms.value);
        formData.append("contactNumber", formElements.contactNumber.value);
        formData.append("manager", formElements.manager.value);

        // Append the image file if it has been changed
        if (image) {
            formData.append("image", image);
        }

        try {
            // Send the formData to the backend
            const res = await updateBuilding({ id, data: formData }).unwrap();

            if (res?.success === true) {
                toast.success(res?.message);
                navigate("/home/building");
            } else {
                toast.error("Failed to update building");
            }
        } catch (error) {
            toast.error("Failed to update building");
            console.error("Failed to update building:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white relative p-6">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="text-white">Loading...</div>
                </div>
            )}
            <p className="text-[#A449EB] text-[17px]">Update Building</p>
            <div className="flex flex-col items-center justify-center w-full h-full mb-3 mt-4">
                <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full border-2 cursor-pointer bg-gray-50 relative ${image || data?.building?.buildingImage ? 'h-[60vh]' : 'h-64'}`}
                >
                    <div className="flex flex-col items-center justify-center w-full h-full z-10">
                        {imagePreview || data?.building?.buildingImage ? (
                            <img src={imagePreview || data?.building?.buildingImage} alt="Preview" className="w-full h-full object-cover" height={"100%"} />
                        ) : (
                            <>
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm sm:text-lg text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Upload Building Image</span>
                                </p>
                            </>
                        )}
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        name="image"
                    />
                </label>
            </div>

            <div className="relative w-full">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="">
                            <label
                                htmlFor="buildingName"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Building Name
                            </label>
                            <input
                                type="text"
                                name="buildingName"
                                id="buildingName"
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                                placeholder="Building Name"
                                defaultValue={data?.building?.buildingName || ''}
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="type"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Type
                            </label>
                            <select
                                name="buildingType"
                                id="type"
                                defaultValue={data?.building?.buildingType || ''}
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                            >
                                <option value="" disabled>
                                    Select a type
                                </option>
                                <option value="commercial">Commercial</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div className="">
                            <label
                                htmlFor="location"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Location
                            </label>
                            <input
                                type="text"
                                name="buildingLocation"
                                id="location"
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                                placeholder="Location"
                                defaultValue={data?.building?.buildingLocation || ''}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5">
                        <div className="">
                            <label
                                htmlFor="area"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Area (sqft)
                            </label>
                            <input
                                type="text"
                                name="buildingArea"
                                id="area"
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                                placeholder="Area"
                                defaultValue={data?.building?.buildingArea || ''}
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="totalFloors"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Total Floors
                            </label>
                            <input
                                type="number"
                                name="totalFloors"
                                id="totalFloors"
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                                placeholder="Total Floors"
                                defaultValue={data?.building?.totalFloors || ''}
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="totalRestrooms"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Total Restrooms
                            </label>
                            <input
                                type="number"
                                name="totalRestrooms"
                                id="totalRestrooms"
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                                placeholder="Total Restrooms"
                                defaultValue={data?.building?.totalRestrooms || ''}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-5">
                        <div className="">
                            <label
                                htmlFor="contactNumber"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Contact Number
                            </label>
                            <input
                                type="text"
                                name="contactNumber"
                                id="contactNumber"
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                                placeholder="Contact Number"
                                defaultValue={data?.building?.contactNumber || ''}
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="manager"
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Manager
                            </label>
                            <input
                                type="text"
                                name="manager"
                                id="manager"
                                className="shadow-sm border-[1px] sm:text-sm rounded-[5px] w-full p-2.5 outline-none bg-[#FFFFFF] border-[#00000040] text-[#111111]"
                                placeholder="Manager"
                                defaultValue={data?.building?.manager || ''}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            disabled={isLoading} // Disable button when loading
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBuilding;
