import {useContext, useEffect, useState,useCallback} from 'react'

import RentContext from "../context/RentContext"
import RentService from '../services/RentService'

export function useRent(){
    const [loading, setLoading] = useState(false)
    const {rent, setRent} = useContext(RentContext)
    const [isDashboard, setIsDashboard] = useState(false)

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
            console.log(data)
            setRent(data)
            console.log(rent)
        })
    },[setRent])

    const end_rent = useCallback((rent, id) =>{
        RentService.endRent(rent, id)
        .then(({data}) =>{
            console.log(data);
            setRent([])
        }).catch(({error}) =>{
            console.log(error);
            setRent([])
        })
    },[setRent])

    const isRent = () =>{
        if (rent.length === 0) {
            return false
        }
        return true
    }

    return {
        loading : loading, rent: rent,isRent: isRent(), start_rent, end_rent, isDashboard, setIsDashboard};
}