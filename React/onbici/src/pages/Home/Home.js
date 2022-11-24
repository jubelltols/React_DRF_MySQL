import React, { useContext }  from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import AuthContext from '../../context/AuthContext'
import Dashboard from '../Dashboard/Dashboard'
import Rent from '../Rent/Rent'
import Checkout from "../Checkout/Checkout";
import Homepage from "../Home/Homepage";

export default function Home() {
    const { t } = useTranslation("global");
    const { isAdmin, user, subscription } = useContext(AuthContext);

    return (
        isAdmin ? <Dashboard/> : (user && subscription?.status === "active" ? <Rent/> : (user ? <Checkout/> : <Homepage/>))
    )
}