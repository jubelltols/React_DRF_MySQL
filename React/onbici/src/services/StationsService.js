import http from "./http"

const StationsService = {
    getAllStations() {
        return http().get("/api/station")
    },
    getStation(id) {
        return http().get(`/api/station/${id}`)
    },
    createStation(data) {
        return http().post(`/api/station`, data)
    },
    updateStation(id, data) {
        return http().put(`/api/station/${id}`, data)
    }, 
    deleteStation(id, data) {
        return http().delete(`/api/station/${id}`, data)
    }
};

export default StationsService;