import { useState, useEffect } from "react";
import { Input } from "../Input";
import { ChatContainer, MessagesContainer, MessageBubble } from "./styles";
import { getContent } from "../../ContentService";
import { MindMapViewer } from "../MindMap"; // Importa o novo componente


export function Chat({ selectedOption }) {
    const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
    const [pendingRequest, setPendingRequest] = useState(null); // Dados pendentes para a API

    // Hook para lidar com a chamada da API
    useEffect(() => {
        if (pendingRequest) {
            const { message, option } = pendingRequest;
            const payload = { message, mode: option }; // Inclui a opção no payload
            getContent(payload)
                .then((data) => {
                    if (option === "content") {
                        handleContent(data);
                    } else if (option === "mindmap") {
                        handleMindMap(data);
                    }
                })
                .catch((err) => console.error(err))
                .finally(() => setPendingRequest(null)); // Limpa a requisição pendente
        }
    }, [pendingRequest]);

    // Função para tratar mapas mentais
    const handleMindMap = (data) => {
        openMindMapViewer(data);

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Mapa mental aberto em nova guia.", sender: "bot", type: "text" },
        ]);
    };

    // Função para abrir o componente de mapa mental em uma nova guia
    const openMindMapViewer = (markdown) => {

        const newWindow = window.open("", "_blank", "width=1280,height=720");
        if (newWindow) {
            newWindow.document.title = "Mapa Mental";

            // Renderiza o componente React na nova guia
            const rootDiv = newWindow.document.createElement("div");
            newWindow.document.body.appendChild(rootDiv);

            // Renderiza o MindMapViewer com o conteúdo Markdown
            import("react-dom").then((ReactDOM) => {
                ReactDOM.createRoot(rootDiv).render(
                    <MindMapViewer markdown={markdown} />
                );
            });
        } else {
            console.error("Não foi possível abrir uma nova aba.");
        }
    };

    // Função para tratar conteúdo textual
    const handleContent = (data) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: data, sender: "bot", type: "text" },
        ]);
    };

    // Função para enviar uma mensagem do usuário
    const handleSendMessage = (message) => {
        setMessages([
            ...messages,
            { text: message, sender: "user", type: "text" },
        ]);
        setPendingRequest({ message, option: selectedOption });
    };

    // Função auxiliar para formatar mensagens
    const formatMessage = (message) => {
        return message.text.split("\n").map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <ChatContainer>
            <MessagesContainer>
                {messages.map((message, index) => (
                    <MessageBubble key={index} sender={message.sender}>
                        {formatMessage(message)}
                    </MessageBubble>
                ))}
            </MessagesContainer>
            <Input onSend={handleSendMessage} />
        </ChatContainer>
    );
}
