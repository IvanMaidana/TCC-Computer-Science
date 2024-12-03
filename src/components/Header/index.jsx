import { useState, useEffect } from "react";
import { Container, Options, Mobile } from "./styles";
import Logo from "../../assets/logo.png";
import { TiThMenu } from "react-icons/ti";

export function Header({ onOptionChange }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("content");

    useEffect(() => {
        // Ativa o menu automaticamente se a tela for >= 760px ao carregar
        if (window.innerWidth >= 760) {
            setMenuOpen(true);
        } else {
            setMenuOpen(false);
        }

        // Adiciona um listener para monitorar o redimensionamento da tela
        const handleResize = () => {
            if (window.innerWidth >= 760) {
                setMenuOpen(true);
            } else {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Remove o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handOptionClick = (option) => {
        if (selectedOption === option) return;
        setSelectedOption(option);
        onOptionChange(option); // Envia a opção selecionada para o componente pai (ou Chat)
    }

    return (
        <Container>
            <Mobile>
                <img src={Logo} alt="logo site" />
                <TiThMenu
                    id="iconMenu"
                    size={34}
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
                />
            </Mobile>
            {menuOpen && (
                <Options>
                    <li
                        onClick={() => handOptionClick("content")}
                        style={{ color: selectedOption === "content" ? "red" : "aliceblue", }}
                    >
                        Conteúdo
                    </li>

                    <li
                        onClick={() => handOptionClick("mindmap")}
                        style={{ color: selectedOption === "mindmap" ? "red" : "aliceblue", }}
                    >
                        Mapa Mental
                    </li>
                </Options>
            )}
        </Container>
    );
}
