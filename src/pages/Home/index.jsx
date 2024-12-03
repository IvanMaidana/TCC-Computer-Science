import { Container } from "./styles"
import { useState } from "react";
import { Header }    from "../../components/Header"
import { Chat } from "../../components/Chat";

export function Home() {

    const [selectedOption, setSelectedOption] = useState("content"); // Estado para armazenar a opção selecionada

    const handleOptionChange = (option) => {
        setSelectedOption(option); // Atualiza a opção selecionada com base na interação do usuário no Header
    };

    return (
        <Container>
            <Header onOptionChange={handleOptionChange}/>
            <Chat selectedOption={selectedOption}/>
        </Container>
    );
}