import styled from 'styled-components';

export const NavWrapper = styled.nav`
    display: flex;
    margin-bottom: 20px;
    list-style: none;
    padding: 0;
    align-items: center;
    justify-content: center;
`;

export const PageItem = styled.li`
    margin: 0 5px;
    color: #fff;

    &.active {
        background: #d1b3fc;
    }
`;

export const ButtonItem = styled.button`
    padding: 12px 16px;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    color: #fff;
    transition: background 0.3s ease;

    &:hover {
        background: #f4d1f3;
    }

    &.active {
        background: #f4d1f3;
    }
`;
