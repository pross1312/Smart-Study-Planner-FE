import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateUser } from "../../api/user.api";
import auth from "../../api/auth";
import "./Profile.css";
import { toast } from "react-toastify";

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any | null>(null);
    const [image, setImage] = useState<File | null>(null); // New state for image file
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // Start loading
            try {
                const response = await getProfile();
                const user = response.data.data;
                setProfile(user);
                setFormData(user); // or set form data as needed
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (formData) {
            setLoading(true); // Start loading
            try {
                const response = await updateUser({
                    name: formData.name,
                    email: formData.email,
                    avatar: image == null ? null : image,
                });
                if (response.status === 200) {
                    toast.success(response?.data);
                }
                if (image) {
                    setProfile({
                        ...profile,
                        name: formData.name,
                        email: formData.email,
                        bio: formData.bio,
                        avatar: URL.createObjectURL(image), // Update with preview of the uploaded image
                    });
                } else {
                    setProfile({
                        ...profile,
                        name: formData.name,
                        email: formData.email,
                        bio: formData.bio,
                    });
                }
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating profile:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    const handleLogout = () => {
        auth.logout();
        navigate("/login");
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Display loading indicator
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="grid gap-5 lg:grid-cols-1 xl:grid-cols-4">
            <div className="xxl:col-span-1 order-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1">
                <div className="p-6 bg-white rounded-xl dark:bg-gray-700 st-onboarding-stats-profile-sidebar">
                    <div className="relative mb-3 flex items-center justify-between">
                        <div className="heading flex items-baseline space-x-1">
                            <div className="text-xs  font-bold text-gray-100 dark:text-white">
                                Profile
                            </div>
                            <div className="text-xx text-gray-300"></div>
                        </div>
                        <div className="flex gap-2">
                            <button className="Modal__button" type="button">
                                <div>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icons--xs path--fill-current text-gray-300"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <path
                                                d="M16.824 3.197a2.91 2.91 0 01.877 3.895l-.092.144-5.642 8.365a1 1 0 01-1.718-1.018l.06-.1 5.642-8.365a.91.91 0 00-1.444-1.102l-.064.084L8.8 13.465a1 1 0 01-1.717-1.017l.06-.1 5.642-8.366a2.91 2.91 0 014.04-.785z"
                                                fill="#9656A1"
                                                fill-rule="nonzero"
                                            ></path>
                                            <path
                                                d="M6.52 14.474a1 1 0 01.382.155l2.56 1.722A1 1 0 019.473 18h6.33c.042 0 .085.003.126.008l.022.004c.036.005.07.012.104.02l.02.007c.034.008.066.02.098.032.008.005.017.008.025.012.034.013.066.03.098.047l.01.007a.845.845 0 01.093.06l.057.046-.04-.032c.066.05.125.11.176.176l.006.009.007.009a.977.977 0 01.116.2l.01.025a.789.789 0 01.034.097c0 .007.003.014.004.02a.969.969 0 01.001.506l-.006.02a.807.807 0 01-.033.098l-.011.025a.948.948 0 01-.115.2l-.046.058-.038.04-.012.013c-.029.03-.06.057-.093.083l-.018.013a.906.906 0 01-.092.061l-.01.006a.828.828 0 01-.097.049l-.026.01a.783.783 0 01-.098.034l-.02.004a.83.83 0 01-.104.022l-.042.004-.107.007h-10c-.06 0-.118-.005-.176-.015a1.001 1.001 0 01-.902-1.174l.634-3.53a1 1 0 011.161-.808zm12.283 3.527c.263 0 .521.107.707.293.186.186.293.444.293.707 0 .263-.107.521-.293.707a1.008 1.008 0 01-.707.293c-.263 0-.52-.107-.707-.293a1.007 1.007 0 01-.293-.707c0-.263.107-.52.293-.707.186-.186.444-.293.707-.293z"
                                                fill="#FF6F61"
                                            ></path>
                                        </g>
                                    </svg>
                                </div>
                            </button>
                            <div className="pt-1.5">
                                <div>
                                    <div>
                                        <button
                                            type="button"
                                            className="cursor-pointer"
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="flex-shrink-0"
                                            >
                                                <path
                                                    d="M4.968 8.059a1.996 1.996 0 000-1.79m0 1.79a2 2 0 110-1.79m0 1.79l4.422 2.21m-4.422-4L9.39 4.06m0 6.21a2 2 0 103.579 1.79 2 2 0 00-3.58-1.79zm0-6.21a2 2 0 103.578-1.79A2 2 0 009.39 4.06z"
                                                    stroke="#7B7170"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
