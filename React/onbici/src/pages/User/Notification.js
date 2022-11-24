import { useEffect, useContext } from 'react'

import { useNotification } from '../../hooks/useNotification'
import NotificationContext from '../../context/NotificationContext'

export default function Notifivation() {
    const { changeStatusNotifications } = useNotification()
    const { notification} = useContext(NotificationContext)

    useEffect(function () {
        changeStatusNotifications()
    }, [])

    return (
        <div className="list-group m-5">
            {notification.map((not, index) => (
                <div className={not.status === "active" ? "list-group-item list-group-item-action bg-light" : "list-group-item list-group-item-action"} key={index}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">
                            {not.status === "active" ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill text-primary me-2" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                </svg>
                            :""}
                            { not.title }
                        </h5>
                        <small>{ not.created_at }</small>
                    </div>
                    <p className="mb-1">{ not.description }</p>
                </div>
            ))}
        </div>
    )
}