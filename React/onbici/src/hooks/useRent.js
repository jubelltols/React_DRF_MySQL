import {useContext, useEffect, useState,useCallback} from 'react'

import RentContext from "../context/RentContext"
import RentService from '../services/RentService'
import { useToast } from './useToast';

export function useRent(){
    const [loading, setLoading] = useState(false)
    const {rent, setRent} = useContext(RentContext)
    const [isDashboard, setIsDashboard] = useState(false)
    const { addToast } = useToast();
    
    useEffect(function () {
        RentService.getRent()
        .then(({data}) => {
            setRent(data)
            setLoading(false)
        })
    }, [setRent, setIsDashboard])

    const start_rent = useCallback((rent) =>{
        RentService.startRent(rent)
        .then(({data}) =>{
            setRent(data)
            addToast("start_rent", 200, "alert alert-success shadow-lg", "text-base-content", "success");
        }).catch(({error}) =>{
            addToast("start_rent_end", 200, "alert alert-error shadow-lg", "text-base-content", "error");
            setRent([])
        })
    },[setRent, addToast])

    const end_rent = useCallback((rent, id) =>{
        RentService.endRent(rent, id)
        .then(({data}) =>{
            setRent([])
            addToast("end_rent", 200, "alert alert-success shadow-lg", "text-base-content", "success");
        }).catch(({error}) =>{
            addToast("end_rent_error", 200, "alert alert-error shadow-lg", "text-base-content", "error");
            setRent([])
        })
    },[setRent, addToast])

    const isRent = () =>{
        if (rent.length === 0) {
            return false
        }
        return true
    }

    return {
        loading : loading, rent: rent,isRent: isRent(), start_rent, end_rent, isDashboard, setIsDashboard};
}