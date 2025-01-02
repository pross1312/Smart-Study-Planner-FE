import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateUser } from '../../api/user.api';
import auth from '../../api/auth';
import './Profile.css';
import { toast } from 'react-toastify';

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
                console.error('Error fetching profile:', error);
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
                    toast.done(response?.data);
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
                console.error('Error updating profile:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <>
            <div style={{ fontSize: '30px', fontWeight: 'bold', padding: '12px 0px 0px 41px' }}>Profile</div>
            <div className="profile-container">
                <img
                    src={image ? URL.createObjectURL(image) : profile.avatar}
                    alt="Profile"
                    className="profile-image"
                />
                {isEditing ? (
                    <div className="profile-form">
                        <input
                            type="text"
                            name="name"
                            value={formData?.name || ''}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData?.email || ''}
                            onChange={handleChange}
                        />
                        <textarea
                            name="bio"
                            value={formData?.bio || ''}
                            onChange={handleChange}
                            placeholder="Bio"
                        />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button onClick={handleSave} className="save-btn" disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button onClick={() => setIsEditing(false)} className="cancel-btn" disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-view">
                        <h1 className="profile-name">{profile.name || 'Anonymous'}</h1>
                        <p className="profile-email">{profile.email}</p>
                        <p className="profile-bio">{profile.bio || 'No bio available'}</p>
                        <div className="profile-actions">
                            <button className="save-btn" onClick={handleEdit} disabled={loading}>
                                Edit Profile
                            </button>
                            <button onClick={handleLogout} className="cancel-btn" disabled={loading}>
                                Log Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserProfile;
