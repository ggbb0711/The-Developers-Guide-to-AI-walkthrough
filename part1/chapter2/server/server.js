import express from "express";
import { Ollama } from "ollama";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json())
const ollama = new Ollama();

app.post('/',async (request, response)=>{
    response.type("text/plain");

    const question = request.body.question

    const modelRespones = await ollama.generate({
        model: 'llama3.2',
        prompt: question,
        stream: true
    })

    for await (const chunk of modelRespones){
        console.log(chunk)
        response.write(chunk.response)
    }

    response.end()
})

app.listen(8080,()=>{
    console.log("Server is listening on 8080")
})
