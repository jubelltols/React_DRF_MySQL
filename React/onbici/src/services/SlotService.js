import http from "./http"

const SlotService = {
    getAllSlots() {
        return http().get("/api/slot")
    },
    getSlot(id) {
        return http().get(`/api/slot/${id}`)
    },
    createSlot(data) {
        return http().post(`/api/slot`, data)
    },
    updateSlot(id, data) {
        return http().put(`/api/slot/${id}`, data)
    }, 
    deleteSlot(id, data) {
        return http().delete(`/api/slot/${id}`, data)
    }
};

export default SlotService;