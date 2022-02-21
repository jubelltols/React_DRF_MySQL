import http from "./http"

const NotificationService = {
    getAllNewNotification() {
        return http().get("/api/notification?status=active")
    },
    getAllNotification() {
        return http().get("/api/notification?status=disable")
    },
    getNotification(id) {
        return http().get(`/api/notification/${id}`)
    },
    createNotification(data) {
        return http().post(`/api/notification`, data)
    },
    updateNotification() {
        return http().put(`/api/notification/1`)
    }, 
    deleteNotification(id, data) {
        return http().delete(`/api/notification/${id}`, data)
    }
};

export default NotificationService;