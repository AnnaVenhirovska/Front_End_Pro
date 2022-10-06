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

export interface BookInfo
{
    BookName: String
}

export interface APIHomeResponse {
    login: string;
    creationTime: string;
    lastLoginTime: string;
}

export interface APIBooksList {
    BookName: String[]
}

export interface APIUserBooksList {
    BookName: String[];
    BookProgress: number[]
}

export interface BookProgress
{
    BookName: String;
    BookProgress: number;
}

export class APIService {
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

    getAllBooks() : Promise<APIBooksList>
    {
        return fetch(`${this.host}/api/books/available`, {
            credentials: "include",
            method: 'GET'
        })
        .then(resp => resp.json());
    }

    getUserBooks() : Promise<APIUserBooksList>
    {
        return fetch(`${this.host}/api/getMyBooks`, {
            credentials: "include",
            method: 'GET'
        })
        .then(resp => resp.json());
    }

    userAddBook(payload: BookInfo): Promise<APIUserBooksList>
    {
        return fetch(`${this.host}/api/user/book/add-favorite`, {
            credentials: "include",
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json());
    }

    userRemoveBook(payload: BookInfo): Promise<APIUserBooksList>
    {
        return fetch(`${this.host}/api/user/book/remove-favorite`, {
            credentials: "include",
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json());
    }

    getUserBooksByID(payload: Number) : Promise<APIUserBooksList>
    {
        return fetch(`${this.host}/api/${payload}/`, {
            credentials: "include",
            method: 'GET'
        })
        .then(resp => resp.json());
    }

    userBookProgress(payload: BookProgress) : Promise<APIUserBooksList>
    {
        return fetch(`${this.host}/api/user/book/progress`, {
            credentials: "include",
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
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