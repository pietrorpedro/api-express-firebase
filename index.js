import app from "./src/app.js";

const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`API: localhost:${port}`)
})