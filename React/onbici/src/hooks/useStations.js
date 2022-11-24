import {useContext, useCallback, useEffect, useState} from 'react'
import StationsContext from '../context/StationsContext'
import StationsService from '../services/StationsService'

export function useStations () {
    const [loading, setLoading] = useState(false)
    const {stations, setStations} = useContext(StationsContext)
   /*  const [stations, setStations] = useState(null) */
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(function () {
        setLoading(true)
        StationsService.getAllStations() 
        .then( ({data}) => {
            setStations(data)
            setLoading(false)
        })
    }, [setStations])

    const getStations = useCallback((id) =>{
        StationsService.getStation(id)
        .then(({data}) => {
            if(data){
                setStations(data)
            }
        })
    },[])

    const createStation = useCallback((data) =>{
        let formData = new FormData(); 

        formData.append('name', data.name);   
        formData.append('status', data.status);
        formData.append('image', data.image[0]);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);

        StationsService.createStation(formData)
        .then(({data}) => {
            if(data){
                setIsCorrect(true)
                setTimeout(() => {
                    setIsCorrect(false)
                }, 1000);
            }
        })
    },[])

    const updateStation = useCallback((id, data) =>{

        let formData = new FormData(); 

        formData.append('name', data.name);   
        formData.append('status', data.status);
        formData.append('image', data.image[0]);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);
        
        StationsService.updateStation(id, formData)
        .then(({data}) => {
            if(data){
                setIsCorrect(true)
                setTimeout(() => {
                    setIsCorrect(false)
                }, 1000);
            }
        })
    },[])

    const changeStatusStation = ((id, data) =>{
        StationsService.updateStation(id, data)
        .then(({data}) => {
            if(data){
                setStations(
                    stations.map(function (station) {
                        if(station.id === id){
                            station.status = station.status === "active" ? "disable" : "active"
                        }
                        return station; 
                    })
                )
            }
        })
    })

    const deleteStation = ((id) =>{
        StationsService.deleteStation(id)
        setStations(stations.filter(station => station.id !== id))
    })

    return {loading, stations, createStation, getStations, updateStation, changeStatusStation, deleteStation, isCorrect}
}