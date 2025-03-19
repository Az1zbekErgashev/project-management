import styled from "styled-components";

export const StyledSelection = styled.div`
    padding: 20px;
    text-align: center;
    display: flex;
    justify-content: center; 
    align-items: center; 

    .upload-container {
        width: 500px;
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .choose-option {
        padding: 10px;
    }

    .selection-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px 0;
    }

    .upload-btn, .input-selection-btn {
        width: 100%;
        height: 30;
        border-radius: 10px;
        margin-top: 20px;
    }

    .close-btn {
        margin-top: 20px;
        text-align: center;
        align-items: center;
        border-radius: 10px;
    }
`;
