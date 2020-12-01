import { action, observable } from "mobx";

import firebase from 'firebase/app'
import { Message } from "../types";

class Store {
    storage: firebase.storage.Reference | null = null

    @action
    notify(msg?: Message) {
        const m = [] as string[]
        this.message = msg?.length ? m.concat(msg) : m
    }

    @action
    setAuth(auth: string | null) {
        this.auth = auth
    }

    @observable
    message: string[] = []

    @observable
    auth: string | null = sessionStorage.getItem('token')
}

export default new Store();