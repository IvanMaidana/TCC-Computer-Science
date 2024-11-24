import { useState, useEffect } from "react";
import { Container, Options, Mobile } from "./styles";
import Logo from "../../assets/logo.png";
import { TiThMenu } from "react-icons/ti";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <li><a href="#content">Conteúdo</a></li>
                    <li><a href="#map">Mapa Mental</a></li>
                </Options>
            )}
        </Container>
    );
}
