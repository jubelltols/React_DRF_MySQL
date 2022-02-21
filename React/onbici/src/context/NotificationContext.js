import React, { useState, useEffect } from 'react'

import NotificationService from '../services/NotificationService'

const Context = React.createContext({})

export function NotificationContextProvider ({children}) {
    const [notification, setNotification] = useState([])
    const [newNotification, setNewNotification] = useState([])
    const [refreshNotifications, setRefreshNotifications] = useState(false)

    useEffect(function () {
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
    }, [refreshNotifications, setRefreshNotifications, setNotification])

    return  <Context.Provider value = {{notification, setNotification, newNotification, setNewNotification, refreshNotifications, setRefreshNotifications}}>
                {children}
            </Context.Provider>
}

export default Context