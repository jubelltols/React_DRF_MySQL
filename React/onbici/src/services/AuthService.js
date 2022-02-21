import http from "./http"

const AuthService = {
    login(data) {
        return http().post("/api/login/", data)
    },
    signup(data) {
        console.log(data);
        return http().post(`/api/register/`, data)
    },
    getUser(data) {
        return http().get("/api/user/", data)
    },
    isAdmin(data) {
        return http().get("/api/userIsAdmin/", data)
    },
    changePassword(data){
        return http().put(`/api/change_password/`, data)
    }, 
    updateUser(data){
        return http().put(`/api/profile/update/`, data)
    }
};

export default AuthService;