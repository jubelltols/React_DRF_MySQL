import { useCallback, useContext} from 'react'

import NotificationService from '../services/NotificationService'
import NotificationContext from "../context/NotificationContext"

export function useNotification () {
    const {notification, setNotification, refreshNotifications, setRefreshNotifications} = useContext(NotificationContext)

    const changeStatusNotifications = useCallback(() =>{
        NotificationService.updateNotification()
        setRefreshNotifications(true)
    },[])

    return {notification, setNotification, refreshNotifications, setRefreshNotifications, changeStatusNotifications}
}