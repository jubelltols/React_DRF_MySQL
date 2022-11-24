import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import NotificationContext from "../../context/NotificationContext"
import { useTranslation } from "react-i18next";

export default function Header () {
    const { t } = useTranslation("global");
    const { user, logout, isAdmin } = useAuth();
    const { newNotification, setRefreshNotifications } = useContext(NotificationContext)

    useEffect(function () {
        setRefreshNotifications(true)
    }, [setRefreshNotifications])

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                        {
                            user ? (
                                isAdmin ? 
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link to="/dashboard">{t("dashboard")}</Link></li>
                                    <li><Link to="/slot">{t("slot")}</Link></li>
                                    <li><Link to="/stations">{t("stations")}</Link></li>
                                    <li><Link to="/bikes">{t("bike")}</Link></li>
                                    <li><Link to="/incidences">{t("incidences")}</Link></li>
                                </ul>
                                : 
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    
                                </ul>
                            ) : 
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link to="/rates">{t("rates")}</Link></li>
                                    <li><Link to="/map">{t("map")}</Link></li>
                                    <li><Link to="/how-its-work" >{t("how_its_work")}</Link></li>
                            </ul>
                        }
                </div>
                <Link to={user ? (isAdmin ? "/dashboard" : "/rent") : "/"}>
                    <img src="http://127.0.0.1:8000/media/svg/logo.png"  alt="totem" height="90" width="125" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                {
                    user ? (
                        isAdmin ? 
                        <ul tabIndex={0} className="menu menu-horizontal p-0">
                            <li><Link to="/dashboard">{t("dashboard")}</Link></li>
                            <li><Link to="/slot">{t("slot")}</Link></li>
                            <li><Link to="/stations">{t("stations")}</Link></li>
                            <li><Link to="/bikes">{t("bike")}</Link></li>
                            <li><Link to="/incidences">{t("incidences")}</Link></li>
                        </ul>
                        : 
                        <ul tabIndex={0} className="menu menu-horizontal p-0">
                            
                        </ul>
                    ) : 
                    <ul tabIndex={0} className="menu menu-horizontal p-0">
                            <li><Link to="/rates">{t("rates")}</Link></li>
                            <li><Link to="/map">{t("map")}</Link></li>
                            <li><Link to="/how-its-work" >{t("how_its_work")}</Link></li>
                    </ul>
                }
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        {/* {isAdmin ?
                            <div className="dropdown dropdown-open">
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                        <span className="badge badge-xs badge-primary indicator-item"></span>
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        {newNotification.length > 0 ?
                                        <>
                                            {newNotification.map(( not, index ) => (
                                                <li>{not.title}</li>
                                            ))}
                                            <li><Link className="dropdown-item" to="/notification">{t("view_notification")}</Link></li>
                                        </>
                                        : <>
                                            <li><p>{t("no_notifications")}</p></li>
                                            <li><Link className="dropdown-item" to="/notification">{t("view_notification")}</Link></li>
                                        </>}
                                </ul>
                            </div>
                        : ""} */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.image} alt="profileimage" width="35" height="35" className="rounded-circle bg-secondary"></img>
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li><Link className="dropdown-item" to="/profile">{t("profile")}</Link></li>
                                <li><button className="dropdown-item" onClick={logout}>{t("logout")}</button></li>
                            </ul>
                        </div>
                    </>
                    )
                    : (
                    <div>
                        <button className="btn btn-sm btn-outline m-1"><Link to="/signin" className="text-decoration-none text-light">{t("signin")}</Link></button>
                        <button className="btn btn-sm m-1"><Link to="/signup" className="text-decoration-none text-dark">{t("signup")}</Link></button>
                    </div>
                    )}
            </div>
        </div>
    )
}