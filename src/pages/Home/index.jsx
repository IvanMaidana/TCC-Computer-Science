import { Container } from "./styles"

import { Header }    from "../../components/Header"
import { Chat } from "../../components/Chat";

export function Home() {
    return (
        <Container>
            <Header/>
            <Chat />
        </Container>
    );
}