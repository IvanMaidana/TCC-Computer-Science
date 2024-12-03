import axios from "axios";

export async function getContent(payload) {
    const { message, mode } = payload;

    if (mode === "content") {
        // const response = await axios.post("http://localhost:11434/api/generate", {
        //     "model": "llama3",
        //     "prompt": message,
        //     "stream": false
        // });
        // console.log(response.data.response);
        // return response.data.response.toString(); 
    return ("conteudo");
    } else if (mode === "mindmap") {
        return (`
# Título Principal
## Subtítulo
- Item 1
- Item 2
`);
    }
}