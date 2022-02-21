import http from "./http"

const IncidencesService = {
    getAllIncidences() {
        return http().get("/api/incidences")
    },
    getIncidence(id) {
        return http().get(`/api/incidences/${id}`)
    },
    createIncidence(data) {
        return http().post(`/api/incidences`, data)
    },
    updateIncidence(id, data) {
        return http().put(`/api/incidences/${id}`, data)
    }, 
    deleteIncidence(id, data) {
        return http().delete(`/api/incidences/${id}`, data)
    }
};

export default IncidencesService;