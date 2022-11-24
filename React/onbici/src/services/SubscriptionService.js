import http from "./http"

const SubscriptionService = {
    getUserSubscription() {
        return http().get(`/api/subscription/user/`)
    },
    createSubscription(data) {
        return http().post(`/api/subscription/create/`, JSON.stringify(data))
    },
    cancelSubscription(data) {
        return http().put(`/api/subscription/cancel/`, JSON.stringify(data))
    },
    updateSubscription(data) {
        return http().put(`/api/subscription/update/`, JSON.stringify(data))
    },
    reactiveSubscription() {
        return http().put(`/api/subscription/reactive/`)
    }, 
};

export default SubscriptionService;