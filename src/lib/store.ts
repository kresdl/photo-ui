import { action, observable, makeObservable } from 'mobx';
import AggregateError from 'aggregate-error'

class Store {
    constructor() {
        makeObservable(this)
    }

    @action
    notify(msg: string | Error | AggregateError | null) {
        if (!msg) {
            this.message = [];
        } else if (typeof msg === 'string') {
            this.message = [msg]
        } else if (msg instanceof AggregateError) {
            this.message = [...msg].map((e: Error) => e.message)
        } else {
            this.message = [msg.message]
        }
        console.log(this.message)
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