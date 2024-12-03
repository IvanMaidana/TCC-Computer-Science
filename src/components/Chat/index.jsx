import { useState, useEffect, useRef } from "react";
import { Input } from "../Input";
import { ChatContainer, MessagesContainer, MessageBubble, MindMapHidden } from "./styles";
import { getContent } from "../../ContentService";

import { Markmap } from "markmap-view";
import { Transformer } from "markmap-lib";


const mapa = `
    # Título Principal
    ## Subtítulo
    - Item 1
    - Item 2
`;


export function Chat({ selectedOption }) {
    const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
    const [pendingRequest, setPendingRequest] = useState(null); // Dados pendentes para a API
    const divRef = useRef(null);

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
        
        
        const transformer = new Transformer();
    
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute("width", "400");
        svg.setAttribute("height", "400");

        divRef.current.appendChild(svg);

        const mm = Markmap.create(svg);
        const { root } = transformer.transform(mapa);
        mm.setData(root);
        mm.fit();

        // Abre uma nova guia e insere o SVG
        console.log(svg);
        openSvgInNewTab(svg);

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Mapa mental aberto em nova guia.", sender: "bot", type: "text" },
        ]);
    };

    // Função para abrir o SVG em uma nova guia
    const openSvgInNewTab = (svg) => {
        const newWindow = window.open("", "_blank");
        if (newWindow) {
            const svgHtml = `
                <html>
                    <head>
                        <title>Mapa Mental</title>
                    </head>
                    <body>
                        <div style="text-align:center; margin-top: 20px;">
                            ${svg}
                            <h1>teste</h1>
                        </div>
                    </body>
                </html>
            `;
            newWindow.document.write(svgHtml);
            newWindow.document.close();
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
            <MindMapHidden ref={divRef}/>
        </ChatContainer>
    );
}
