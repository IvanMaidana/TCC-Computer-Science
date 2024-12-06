import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;


if (!apiKey) {
    throw new Error("API Key is missing. Ensure VITE_API_KEY is set in your .env file.");
}

export async function getContent(payload) {
    const { message, mode } = payload;
    let prompt = message;

    if (!message || !mode) {
        throw new Error("Payload must include both 'message' and 'mode'.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

    if(mode === "mindmap"){
        prompt = `${message}\n
            Crie um mapa mental no formato Markdown. 
            - Não inclua nenhuma introdução ou explicação na resposta.
            - Não escreva "\`\`\` markdown" no início e no fim da resposta "\`\`\`".
            - Apenas forneça o conteúdo central do mapa mental em formato Markdown.
            - Use uma estrutura hierárquica com tópicos e subtópicos claros.`;
    } else if (mode === "content"){
        prompt = `${message}\nResponda de forma clara. Não use formatações de Markdown.`;
    }
    try {
            const result = await model.generateContent(prompt);
            
            console.log(result.response.text());
            console.log(result);
            return result.response.text();
        } catch (error) {
            console.error("Error in generating: ", error);
            throw new Error(`Failed to generate ${mode}.`);
        }
} 
