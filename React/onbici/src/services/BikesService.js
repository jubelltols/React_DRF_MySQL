import http from "./http"

const StationsService = {
    getAllBikes() {
        return http().get("/api/bikes")
    },
    getBike(id) {
        return http().get(`/api/bikes/${id}`)
    },
    createBike(data) {
        return http().post(`/api/bikes`, data)
    },
    updateBike(id, data) {
        return http().put(`/api/bikes/${id}`, data)
    }, 
    deleteBike(id, data) {
        return http().delete(`/api/bikes/${id}`, data)
    },
    changeStatusBike(id, data) {
        return http().put(`/api/bike/status/${id}`, data)
    }, 
};

export default StationsService;