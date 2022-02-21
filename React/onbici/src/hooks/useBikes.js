import {useEffect, useState, useCallback} from 'react'
import { useNavigate } from "react-router-dom"

import BikesService from '../services/BikesService'

export function useBikes () {
    const [loading, setLoading] = useState(false)
    const [bikes, setBikes] = useState([])
    const navigate = useNavigate();

    useEffect(() =>{
        setLoading(true)
        BikesService.getAllBikes() 
        .then( ({data}) => {
            setBikes(data)
            setLoading(false)
        })
    }, [setBikes])

    const getBike = useCallback((id) =>{
        BikesService.getBike(id)
        .then(({data}) => {
            if(data){
                setBikes(data)
            }
        })
    },[])

    const createBike = useCallback((data) =>{
        BikesService.createBike(data)
        .then(({data}) => {
            if(data){
                navigate('/bikes');
            }
        })
    },[navigate])

    const updateBike = useCallback((id, data) =>{
        BikesService.updateBike(id, data)
        .then(({data}) => {
            if(data){
                navigate('/bikes');
            }
        })
    },[navigate])

    const changeStatusBike = ((id, data) =>{
        BikesService.changeStatusBike(id, JSON.stringify(data))
        .then(({data}) => {
            if(data){
                setBikes(
                    bikes.map(function (bike, index, array) {
                        if(bike.id === id){
                            bike.status = bike.status === "active" ? "disabñe" : "active"
                        }
                        return bike; 
                    })
                )
            }
        })
    })

    const deleteBike = ((id) =>{
        BikesService.deleteBike(id)
        setBikes(bikes.filter(bike => bike.id !== id))
    })

    return {loading, bikes, getBike, createBike, updateBike, changeStatusBike, deleteBike }
}