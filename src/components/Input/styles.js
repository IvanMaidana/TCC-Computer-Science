import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    width: 80vw;
    background-color: aliceblue;
    justify-content: center;
    min-height: 3rem;
    max-height: 15rem;
    border-radius: 15px;
    margin: 0 auto;
    position: absolute;
    bottom: 4rem;
    left: 0;
    right: 0;

    > textarea{
        width: 80%;
         border: none; 
        font-size: 1.2rem;
        padding: 1rem 0 1rem 0;
        border-radius: 5px;
        outline: none;
        resize: none;
        background-color: aliceblue;
        
    }



    > button{
        width: 15%;
        font-size: 20px;
        border: none;
        background-color: aliceblue;
        size: 4 rem;
        border-radius: 50%; 

        #search{
            font-size: 3rem;
            color: red;
            cursor: pointer;
        }
    }

    /* 
     
    border: none;
    
    padding: 1rem;
    font-size: 1.5rem; */

`;
