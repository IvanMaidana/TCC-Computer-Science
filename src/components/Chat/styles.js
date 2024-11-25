import styled from "styled-components";

// Container do chat completo
export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 70%;
    height: 75vh;
    margin: 0 auto;
    background-color: #3c6975;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

// Container das mensagens
export const MessagesContainer = styled.div`
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    /* background-color: #ffffff; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

// Estilo para a bolha de mensagem
export const MessageBubble = styled.div`
    background-color: ${({ sender }) => (sender === "user" ? "#007bff" : "#e0e0e0")};
    color: ${({ sender }) => (sender === "user" ? "#ffffff" : "#000000")};
    padding: 0.8rem;
    border-radius: 10px;
    max-width: 90%;
    align-self: ${({ sender }) => (sender === "user" ? "flex-end" : "flex-start")};
    word-wrap: break-word;
`;
