import { useRef, useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import { Container } from "./styles";

export function Input({ onSend }){
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        const textarea = textareaRef.current;
        textarea.style.height = "4rem"
        const scrollHeight = e.target.scrollHeight;
        // Limite máximo em rem (15rem = 150px quando 1rem = 10px)
        const maxHeight = 15 * 10;
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        setMessage(e.target.value);// Atualiza o estado com a mensagem
    }

    const handleSend = () => {
        console.log(message)
        if(message.trim()){
            onSend(message); // Envia a mensagem para o componente pai
            setMessage(""); // Limpa o campo de texto após o envio
        }
    }

    return(
        <Container>
            <textarea 
                type="text" 
                placeholder="Digite sua mensagem..." 
                value={message}
                ref={textareaRef}
                onInput={handleInput}
                onKeyDown={(e) => {
                    if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        handleSend();
                    }
                }}
                required/>
            <button id="send" onClick={handleSend}>
                <RiSendPlaneLine id="search" />
                </button>
        </Container>
    );
};