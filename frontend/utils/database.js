
export default class Database {
    constructor(link) {
        this.link = link
    }

    async fetchData(endpoint) {
        try {
            const data = await fetch(`${this.link}/${endpoint}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await data.json()
            return result;

        } catch(error) {
            console.error("Error occured:", error)
        }
    }

    async postData(endpoint, data) {
        const send = await fetch(`${this.link}/${endpoint}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const sent = await send.json()
        return sent;
    }
}