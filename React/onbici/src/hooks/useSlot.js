import {useCallback, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"

import SlotService from '../services/SlotService'

export function useSlot () {
    const [loading, setLoading] = useState(false)
    const [slot, setSlot] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const navigate = useNavigate();

    useEffect(function () {
        setLoading(true)
        SlotService.getAllSlots() 
        .then( ({data}) => {
            setSlot(data)
            setLoading(false)
        })
    }, [setSlot])

    const getSlot = useCallback((id) =>{
        SlotService.getSlot(id)
        .then(({data}) => {
            if(data){
                console.log("----------------");
                setSlot(data)
            }
        })
    },[])

    const createSlot = useCallback((data) =>{
        console.log(data);
        SlotService.createSlot(data)
        .then(({data}) => {
            if(data){
                navigate('/slot');
            }
        })
    },[navigate])

    const updateSlot = useCallback((id, data) =>{
        SlotService.updateSlot(id, data)
        .then(({data}) => {
            if(data){
                navigate('/slot');
            }
        })
    },[navigate])

    const changeStatusSlot = ((id, data) =>{
        SlotService.updateSlot(id, data)
        .then(({data}) => {
            if(data){
                setSlot(
                    slot.map(function (slot) {
                        if(slot.id === id){
                            slot.status = slot.status === "active" ? "disabñe" : "active"
                        }
                        return slot; 
                    })
                )
            }
        })
    })

    const deleteSlot = ((id) =>{
        SlotService.deleteSlot(id)
        setSlot(slot.filter(slot => slot.id !== id))
    })

    return {loading, slot, createSlot, getSlot, updateSlot, changeStatusSlot, deleteSlot, isCorrect}
}