import {useContext, useState, useCallback} from 'react'
import { useNavigate } from "react-router-dom"

import AuthContext from "../context/AuthContext"
import SubscriptionService from '../services/SubscriptionService'
import { useToast } from './useToast';

export function useSubscription(){
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [ status, setStatus] = useState({loading: false, error: false, error_message: ""});
    const { suscription, setSubscription } = useContext(AuthContext);

    const createSubscription = useCallback((data) => {
        setStatus({ loading: true, error: false });
        SubscriptionService.createSubscription(data) 
        .then((res) => {
            setStatus({ loading: false, error: false, error_message: "" });
        }).catch((error) => {
            setStatus({ loading: false, error: true, error_message: error.response.data.message });
        });
    },[setStatus]);

    const cancelSubscription = useCallback((cancel_at_period_end) => {
        setStatus({ loading: true, error: false });
        SubscriptionService.cancelSubscription({cancel_at_period_end}) 
        .then((res) => {
            setStatus({ loading: false, error: false, error_message: "" });
            if(cancel_at_period_end){
                addToast("toast_message_cancel_subscription", 200, "alert alert-success shadow-lg", "text-base-content", "success");
                setSubscription(res.data);
            }else{
                addToast("toast_message_cancel_immediately_subscription", 500, "alert alert-success shadow-lg", "text-base-content", "success");
                setSubscription(res.data);
                navigate('/checkout');
            }
            
        }).catch((error) => {
            addToast("toast_message_cancel_subscription_error", 500, "alert alert-error shadow-lg", "text-base-content", "error");
            setStatus({ loading: false, error: true, error_message: "" });
        });
    },[setStatus, navigate, addToast, setSubscription]);

    const reactiveSubscription = useCallback((cancel_at_period_end) => {
        setStatus({ loading: true, error: false });
        SubscriptionService.reactiveSubscription({cancel_at_period_end}) 
        .then((res) => {
            setStatus({ loading: false, error: false, error_message: "" });
            addToast("toast_message_reactive_subscription", 200, "alert alert-success shadow-lg", "text-base-content", "success");
            setSubscription(res.data);
        }).catch((error) => {
            addToast("toast_message_reactive_subscription_error", 500, "alert alert-error shadow-lg", "text-base-content", "error");
            setStatus({ loading: false, error: true, error_message: "" });
        });
    },[setStatus, addToast, setSubscription]);

    const updateSubscription = useCallback((data) => {
        setStatus({ loading: true, error: false });
        SubscriptionService.updateSubscription(data) 
        .then((res) => {
            setStatus({ loading: false, error: false, error_message: "" });
            setSubscription(res.data);
            addToast("toast_message_update_subscription", 200, "alert alert-success shadow-lg", "text-base-content", "success");
            navigate("/profile")
        }).catch((error) => {
            addToast("toast_message_update_subscription_error", 500, "alert alert-error shadow-lg", "text-base-content", "error");
            setStatus({ loading: false, error: true, error_message: error.response.data.message });
        });
    },[setStatus, navigate, setSubscription, addToast]);

    return { suscription, status, setStatus, createSubscription, cancelSubscription, reactiveSubscription, updateSubscription };
}