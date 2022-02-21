import {useEffect, useState} from 'react'

import RentService from '../services/RentService'

export function useDashboard(){
    const [ data, setData ] = useState([])

    useEffect(function () {
        RentService.chartRent()
        .then(({data}) =>{
            setData(data)
        }).catch(({error}) =>{
            setData([])
        })
    }, [])

    return { data, setData};
}