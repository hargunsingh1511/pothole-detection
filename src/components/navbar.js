import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className="font-serif">
            <div className="h-40 font-semibold flex justify-between items-center">
                <div className="p-8 cursor-pointer h-full items-center">
                    Pothole Detection
                </div>
                <div className="w-[40%] justify-between p-8 flex h-full">
                    <div className="h-fit cursor-pointer border-black">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'active border-b-2 border-black' : 'hover:border-b-2 border-black'
                            }
                        >
                            Home
                        </NavLink>
                    </div>
                    <div className="h-fit cursor-pointer border-black">
                        <NavLink
                            to="/AboutUs"
                            className={({ isActive }) =>
                                isActive ? 'active border-b-2 border-black' : 'hover:border-b-2 border-black'
                            }
                        >
                            About Us
                        </NavLink>
                    </div>
                    <div className="h-fit cursor-pointer  border-black">
                        <NavLink
                            to="/Contact"
                            className={({ isActive }) =>
                                isActive ? 'active border-b-2 border-black' : 'hover:border-b-2 border-black'
                            }
                        >
                            Contact Us
                        </NavLink>
                    </div>
                    <div>
                        <button className="text-white relative -translate-y-3 bg-black rounded-lg">
                            <NavLink
                                to="/Signup"
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                <div className="font-thin mx-6 my-3">
                                    Sign Up
                                </div>
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Navbar;
