import React, { useState, useEffect, useContext } from 'react'

import NotificationService from '../services/NotificationService'
import AuthContext from '../context/AuthContext'

const Context = React.createContext({})

export function NotificationContextProvider ({children}) {
    const [notification, setNotification] = useState([])
    const [newNotification, setNewNotification] = useState([])
    const [refreshNotifications, setRefreshNotifications] = useState(false)
    const { isAdmin } = useContext(AuthContext)

    useEffect(function () {
        if(isAdmin){
            if(refreshNotifications){
            setRefreshNotifications(false)
            NotificationService.getAllNotification() 
            .then( ({data}) => {
                setNotification(data)
            })

            NotificationService.getAllNewNotification() 
            .then( ({data}) => {
                setNewNotification(data)
            })
        }
        }
    }, [refreshNotifications, setRefreshNotifications, setNotification])

    return  <Context.Provider value = {{notification, setNotification, newNotification, setNewNotification, refreshNotifications, setRefreshNotifications}}>
                {children}
            </Context.Provider>
}

export default Context