import http from "./http"

const RentService = {
    getRent() {
        return http().get("/api/rent")
    },
    startRent(rent) {
        return http().post(`/api/rent`, rent)
    },
    endRent(rent, id) {
        return http().put(`/api/rent/${id}`, rent)
    },
    chartRent() {
        return http().get(`/api/char`)
    }
};

export default RentService;