export interface APILoginPayload {
    login: string;
    password: string;
}

export interface APIQuestionPayload {
    question: string
}

export interface APIResponse {
    status: string;
}

export interface APIHomeResponse {
    login: string;
    creationTime: string;
    lastLoginTime: string;
}

class APIService {
    host =  'http://127.0.0.1:9555'

    login(payload: APILoginPayload): Promise<APIResponse> {
        return fetch(`${this.host}/auth/login`, {
            credentials: "include",
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json());
    }

    register(payload: APILoginPayload): Promise<APIResponse> {
        return fetch(`${this.host}/auth/create`, {
            credentials: "include",
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json());
    }

    getAllUsers(): Promise<APIHomeResponse[]>
    {
        return fetch(`${this.host}/users/all`, {
            credentials: "include",
            method: 'GET'
        })
        .then(resp => resp.json());
    }

    SubmitQuestion(questionpayload: APIQuestionPayload): Promise<APIResponse>
    {
        return fetch(`${this.host}/contact/ask`, {
            credentials: "include",
            method: 'POST',
            body: JSON.stringify(questionpayload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json());
    }
}

export default new APIService();