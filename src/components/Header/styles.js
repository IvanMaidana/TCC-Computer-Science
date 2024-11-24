import styled from "styled-components";

export const Container = styled.header`
    background-color: #183d45;
    width: 100%vw;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media (max-width: 760px) {
        flex-direction: column;
        align-items: end;
        padding: 0 1rem 1rem 0;
    }

`;

export const Options = styled.ul`
     display: flex; 

    > li{
        list-style: none;
        margin-left: 3rem;
        > a{
            font-size: 2rem;
            color: red;
            text-decoration: none;
            color: aliceblue;
            transition: 0.5s;
        }

        >a:hover{
            color: red;
        }
    }

    @media (max-width: 760px) {
        
        margin-top: 1rem;
        
         flex-direction: column;
         justify-content: flex-start;
        max-width: 30%vw;

        > li{
            margin-left: 0;
            margin-bottom: 12px;
            display: flex;
        }
    }
`;

export const Mobile = styled.div`
    display: flex;
    align-items: center;

    > img {
        height: 5rem;
    }

    #iconMenu{
        display: none;
        cursor: pointer;
        transition: opacity 0.3s;
        color: aliceblue;
        margin-top: 1rem;
    }

    #iconMenu:hover{
        opacity: 0.7;
    }

    @media (max-width: 760px) {
        justify-content: space-between;
        width: 100%;
        #iconMenu{
            display: flex
        }
    }

`;