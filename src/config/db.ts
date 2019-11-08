import mongoose from "mongoose"

export default class Connect {

    constructor(private url: string) {}

    connection() {
        mongoose.connect(`${this.url}`,{useNewUrlParser: true, useUnifiedTopology: true})
        .then((e) => {
            mongoose.Promise = global.Promise
            console.log("connection a Mongo gut")
        })
        .catch((e: any) => {
            console.log("error en mongo")
            console.log(e.name)
        })
    }
}