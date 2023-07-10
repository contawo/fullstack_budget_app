
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
            if (!result) {
                throw new Error("Data not received")
            }
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
        console.log(sent)
    }

    async authFetch(endpoint) {
        const response = fetch(`${this.link}/${endpoint}`, {
            method: "GET"
        })
        console.log(response)
    }
}