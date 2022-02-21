import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import IncidencesService from '../services/IncidencesService'

export function useIncidences () {
    const [loading, setLoading] = useState(false)
    const [incidences, setIncidences] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const navigate = useNavigate();

    useEffect(function () {
        setLoading(true)
        IncidencesService.getAllIncidences() 
        .then( ({data}) => {
            setIncidences(data)
            setLoading(false)
        })
    }, [setIncidences])

    const createIncidence = useCallback((data) =>{
        IncidencesService.createIncidence(data)
        .then(({data}) => {
            console.log("hola")
            if(data){
                navigate('/rent');
            }
        })
    },[])

    const updateIncidence = useCallback((id, data) =>{
        console.log(data);
        IncidencesService.updateIncidence(id, data)
        .then(({data}) => {
            if(data){
                navigate('/incidences');
            }
        })
    },[])

    const changeStatusIncidences = useCallback((id, data) =>{
        IncidencesService.updateStation(id, data)
        .then(({data}) => {
            if(data){
                setIsCorrect(true)
                setTimeout(() => {
                    setIsCorrect(false)
                }, 1000);
            }
        })
    },[])

    const deleteIncidence = ((id) =>{
        IncidencesService.deleteIncidence(id)
        .then(({data}) => {
            setIncidences(incidences.filter(incidence => incidence.id !== id))
        })
    })

    return {loading, incidences, createIncidence, updateIncidence, changeStatusIncidences, deleteIncidence, isCorrect}
}