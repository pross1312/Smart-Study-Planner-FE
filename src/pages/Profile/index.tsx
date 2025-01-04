import React, { useState, useEffect, useRef } from "react";
import {
    getLeaderboard,
    getProfile,
    LeaderboardEntry,
    Profile,
    updateUser,
} from "../../api/user.api";
import { toast } from "react-toastify";
import * as echarts from "echarts";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../component/Loading";
import { getHistory, History } from "../../api/pomodoro.api";

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<Profile>();
    const [leaderBoard, setLeaderBoard] = useState<LeaderboardEntry[]>([]);
    const [history, setHistory] = useState<History[]>([]);

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // Start loading
            try {
                const response = await getProfile();
                const user = response.data;
                setProfile(user);
            } catch (error) {
                toast.error("Error fetching profile: " + error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        const fetchLeaderboard = async () => {
            try {
                const response = await getLeaderboard(1, 10);
                setLeaderBoard(response.data);
                console.log(response.data);
            } catch (error) {
                toast.error("Error fetching leaderboard: " + error);
            }
        };

        const fetchHistory = async () => {
            try {
                const response = await getHistory();
                setHistory(response.data);
            } catch (error) {
                toast.error("Error fetching history: " + error);
            }
        };

        Promise.all([
            fetchProfile(),
            fetchLeaderboard(),
            fetchHistory(),
        ]).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleSave = async (formData: Profile, image: File | null) => {
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
                        avatar: URL.createObjectURL(image), // Update with preview of the uploaded image
                    } as Profile);
                } else {
                    setProfile({
                        ...profile,
                        name: formData.name,
                        email: formData.email,
                    } as Profile);
                }
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating profile:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    if (loading) {
        return <Loading />; // Display loading indicator
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <>
            <div className="grid gap-5 lg:grid-cols-1 xl:grid-cols-4">
                <div className="xxl:col-span-1 order-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1">
                    <div className="p-6 bg-white rounded-xl dark:bg-gray-700 st-onboarding-stats-profile-sidebar">
                        <div className="relative mb-3 flex items-center justify-between">
                            <div className="heading flex items-baseline space-x-1">
                                <div className="text-xs  font-bold text-black">
                                    Profile
                                </div>
                                <div className="text-xx text-gray-300"></div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="Modal__button"
                                    onClick={() => setIsEditing(true)}
                                    type="button"
                                >
                                    <div>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icons--xs path--fill-current text-gray-300"
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
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <img
                                    src={profile.avatar}
                                    className="rounded-full h-24 w-24 object-cover"
                                    alt="Profile"
                                />
                            </div>

                            <div>
                                <div className="flex flex-wrap">
                                    <span
                                        className="break-word text-lg font-bold"
                                        style={{ color: "rgb(161, 211, 138)" }}
                                    >
                                        {profile.name}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text--emerald">
                                    Advanced (10-20h)
                                </p>
                                <div>
                                    <div className="my-2"></div>
                                    <div className="dark:text-white text-xs">
                                        <span className="text--bold text-xs">
                                            2 hours
                                        </span>{" "}
                                        left until: &nbsp;
                                        <span className="text--sphene text-xs">
                                            Expert (20-40h)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 mb-2 border-t border-gray-400 text-sm text-gray-200"></hr>

                        <section className="mt-4 flex flex-col gap-4">
                            <UserInformationItem
                                icon="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                title="Email"
                                value={profile.email}
                            />
                            <UserInformationItem
                                icon="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                title="Name"
                                value={profile.email}
                            />
                            <UserInformationItem
                                icon="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                title="Bio"
                                value={profile.email}
                            />
                        </section>
                    </div>
                </div>

                <div className="order-2 md:col-span-2">
                    <div className="grid gap-5">
                        <div className="p-6 bg-white rounded-xl st-onboarding-stats-performance">
                            <div className="relative mb-3 flex items-center justify-between">
                                <div className="heading flex items-baseline space-x-1">
                                    <div className="text-xs font-bold text-black">
                                        Performance
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        Time spent in study rooms
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <select className="right-0 -top-2 m-0 border-none bg-transparent p-0 underline underline-offset-2">
                                        <option
                                            className="text-black"
                                            value="daily"
                                        >
                                            Today
                                        </option>
                                        <option
                                            className="text-black"
                                            value="weekly"
                                        >
                                            This week
                                        </option>
                                        <option
                                            className="text-black"
                                            value="monthly"
                                            selected={true}
                                        >
                                            This month
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <PerformanceChart history={history} />

                            <div className="xs:grid-cols-1 grid mt-4 gap-3 rounded-xl md:grid-cols-3">
                                <StatisticItem
                                    icon="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    title="Rank"
                                    value="#11"
                                />
                                <StatisticItem
                                    icon="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    title="Total time"
                                    value="20h"
                                />
                                <StatisticItem
                                    icon="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    title="Average time"
                                    value="2h"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-3 md:col-span-2 xl:col-span-1">
                    <div className="p-6 bg-white rounded-xl dark:bg-gray-700 w-full">
                        <div className="relative mb-3 flex items-center justify-between">
                            <div className="justify-between w-full flex items-baseline space-x-1">
                                <div className="text-xs  font-bold text-black dark:text-white">
                                    Leaderboard
                                </div>
                                <div className="text-xs text-gray-800">
                                    Current rank
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-secondary-400 bg-gray-100 bg-opacity-40 py-3 px-4 text-gray-800">
                            <p className="text-left">
                                <small>
                                    The monthly leaderboard will be reset in
                                    &nbsp;
                                    <u className="float-right font-bold md:float-none">
                                        27 days
                                    </u>
                                </small>
                            </p>
                        </div>

                        <LeaderBoard leaderBoard={leaderBoard} />
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditing}
                setIsOpenEditProfile={setIsEditing}
                initialData={profile}
                onSave={handleSave}
            />
        </>
    );
};

function UserInformationItem({ icon, title, value }: any) {
    return (
        <div className="flex items-center gap-3 rounded-lg bg-bg-secondary-400 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white">
                <img src={icon} alt="" />
            </div>
            <div>
                <p className="text-xs font-normal text-gray-600">{title}</p>
                <p className="text-sm font-semibold text-black">{value}</p>
            </div>
        </div>
    );
}

interface EChartComponentProps {
    width?: string; // Optional width of the chart
    height?: string; // Optional height of the chart
    history: History[];
}

const PerformanceChart: React.FC<EChartComponentProps> = ({
    history,
    width = "100%",
    height = "400px",
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartOptions = useRef<echarts.EChartsOption>({});

    useEffect(() => {
        if (!history || history.length === 0) return;

        const xAxisData = new Map<string, number>();

        history.forEach((item) => {
            const date = new Date(item.start_time * 1000);
            const day = date.toDateString();
            if (xAxisData.has(day)) {
                const value = xAxisData?.get(day) || 0;
                xAxisData.set(day, Number(value) + Number(item.span));
            } else {
                xAxisData.set(day, item.span);
            }
        });

        chartOptions.current.xAxis = {
            data: Array.from(xAxisData.keys()),
        };

        chartOptions.current.series = [
            {
                type: "bar",
                data: Array.from(xAxisData.values()).map((v) => v / 60), // show mins
                itemStyle: {
                    color: "#abd291", // Set the column color here
                },
                name: "Mins",
            },
        ];

        chartOptions.current.yAxis = {
            type: "value",
            name: "Minutes",
        };
    }, [history]);

    useEffect(() => {
        if (!chartRef.current) return;

        const chartInstance = echarts.init(chartRef.current);

        chartInstance.setOption(chartOptions.current);

        const resizeHandler = () => chartInstance.resize();
        window.addEventListener("resize", resizeHandler);

        return () => {
            chartInstance.dispose();
            window.removeEventListener("resize", resizeHandler);
        };
    }, [chartOptions.current]);

    return <div ref={chartRef} style={{ width, height }} />;
};

function StatisticItem({ icon, title, value }: any) {
    return (
        <div className="bg-bg-secondary-400 flex items-center gap-3 justify-center p-4 rounded-lg">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white dark:bg-gray-200">
                <img src={icon} alt="" />
            </div>
            <div>
                <p className="text-xs font-normal text-gray-800 dark:text-gray-400">
                    {title}
                </p>
                <p className="text-sm font-semibold text-black dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}

function LeaderBoard({ leaderBoard }: { leaderBoard: LeaderboardEntry[] }) {
    return (
        <table className="w-full">
            <tbody>
                {leaderBoard.map((entry, index) => (
                    <tr
                        key={entry.email}
                        className="hover:bg-bg-secondary-400 cursor-pointer border-b-2"
                    >
                        <td className="p-4">{index + 1}</td>
                        <td>
                            <img
                                src={entry.avatar}
                                alt="User Avatar"
                                className="rounded-full w-full h-full max-w-16 min-w-7 object-cover"
                            />
                        </td>
                        <td className="font-semibold p-4">{entry.name}</td>
                        <td className="hidden md:flex p-4">
                            {Math.floor(entry.time_span / 60) + "h "}
                            {(entry.time_span % 60) + "m"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function EditProfileModal({
    isOpen,
    setIsOpenEditProfile,
    onSave,
    initialData,
}: {
    isOpen: boolean;
    setIsOpenEditProfile: (isOpen: boolean) => void;
    initialData: Profile;
    onSave: (formData: Profile, image: File | null) => void;
}) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState<Profile>(initialData);
    const [image, setImage] = useState<File | null>(null); // New state for image file

    const handleSubmit = () => {
        onSave(formData, image);
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

    return (
        <>
            <div className="Modal__backdrop absolute inset-0 z-20"></div>
            <div className="Modal__inner  z-30">
                <div className="Modal__window relative p-10 w-full max-w-[580px] rounded-2xl bg-white">
                    <button
                        className="Modal__close"
                        onClick={() => setIsOpenEditProfile(false)}
                    >
                        <AiOutlineClose />
                    </button>
                    <div>
                        <div className="Modal__header">
                            <h3 className="mb-3 font-black text-[#FF6F61] text-2xl">
                                [SVG] Edit profile
                            </h3>
                        </div>
                        <div className="Modal__content">
                            <form onSubmit={handleSubmit}>
                                <div className="overflow-y-overlay max-h-[60vh] px-3 pb-16">
                                    <div className="relative mt-1 flex items-center justify-center">
                                        <input
                                            id="avatar"
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="avatar"
                                            className="flex cursor-pointer h-32 w-32 flex-col items-center justify-center rounded-full bg-gray-400 bg-cover bg-center text-white"
                                            style={{
                                                backgroundImage: `url(${image ? URL.createObjectURL(image) : formData.avatar})`,
                                            }}
                                        >
                                            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gray-100/20">
                                                <span className="text-sm font-bold">
                                                    Change photo
                                                </span>
                                            </div>
                                        </label>
                                    </div>

                                    <InputProfile
                                        header={"👤 Username"}
                                        inputName={"name"}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <InputProfile
                                        header={"🌎 Country"}
                                        placeHolder="e.g. Vietnam"
                                        value="Vietnam"
                                        onChange={handleChange}
                                    />
                                    <InputProfile
                                        header={"📚 Educational level"}
                                        placeHolder="e.g. Bachelor's degree"
                                        onChange={handleChange}
                                        value="Bachelor's degree"
                                    />
                                </div>
                                <div className="mt-[30px] flex justify-end">
                                    <button
                                        type="button"
                                        className="btn-a btn-a-lg btn-a-secondary w-full md:w-auto"
                                        onClick={() => {
                                            setIsOpenEditProfile(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-a btn-a-lg btn-a-primary ml-4 w-full md:w-auto"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function InputProfile({
    header,
    placeHolder,
    inputName,
    value,
    onChange,
}: {
    header: string;
    placeHolder?: string;
    inputName?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-1">
                <div className="font-bold text-lg">{header}</div>
            </div>
            <div className="flex items-center rounded ring-2 ring-inset bg-white ring-gray-300 focus-within:ring-secondary-300">
                <input
                    className="h-10 p-4 bg-transparent outline-none appearance-none text-lg text-black placeholder-gray-300 flex-1 w-full"
                    name={inputName}
                    placeholder={placeHolder}
                    value={value}
                    onChange={(e) => onChange(e)}
                />
            </div>
        </div>
    );
}

export default UserProfile;
