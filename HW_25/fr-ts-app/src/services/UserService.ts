import { APIResponse } from "./APIService";

class UserService {
    putToStorage(payload: APIResponse) {
        localStorage.setItem('user', JSON.stringify({
            login: true,
            status: payload.status
        }));
    }

    deleteFromStorage() {
        localStorage.removeItem('user');
    }
}

export default new UserService();