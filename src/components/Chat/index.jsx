import { useState } from "react";
import { Input } from "../Input";
import { ChatContainer, MessagesContainer, MessageBubble } from "./styles";

export function Chat() {
    const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens

    // Função para enviar uma mensagem do usuário
    const handleSendMessage = (message) => {        
        setMessages([...messages, { text: message, sender: "user" }]);// Adiciona a mensagem do usuário à lista

        setTimeout(() => {// Simula uma resposta de IA (futuramente substitua por uma API)
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "Esta é uma resposta simulada da IA.", sender: "bot" }
            ]);
        }, 1000);
    };
    
    return(
        <ChatContainer>
            <MessagesContainer>
                {messages.map((message, index) => (
                    <MessageBubble key={index} sender={message.sender}>
                        {message.text}
                    </MessageBubble>
                ))}
            </MessagesContainer>
            <Input onSend={handleSendMessage} />
        </ChatContainer>
    );
}