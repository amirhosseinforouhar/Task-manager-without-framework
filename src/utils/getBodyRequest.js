const getBodyRequest = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = ""
            req.on("data", (chunk) => {
                body += chunk
            })
            req.on("end", () => {
                resolve(JSON.parse(body))
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = getBodyRequest 