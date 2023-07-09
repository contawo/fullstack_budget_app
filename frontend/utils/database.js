
export default class Database {
    constructor(link) {
        this.link = link;
    }

    async fetchData() {
        try {
            const data = await fetch(this.link, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await data.json();
            if (result === {} || result === null || result === undefined) {
                throw new Error("Data not received")
            }
            return result;

        } catch(error) {
            console.error("Error occured:", error)
        }
    }

    async postData(data) {
        const send = await fetch(this.link, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const sent = await send.json()
        console.log(sent)
    }
}