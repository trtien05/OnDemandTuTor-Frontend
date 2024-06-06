import { Form, Typography, Input, Button, Card } from "antd";
import styled from "styled-components";

import { theme } from '../../themes';

const { Title, Text } = Typography;
const { TextArea } = Input;
export const StyledModal = styled.div`
  width:1000px;
`;
export const FormContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    column-gap: 5%;
    margin: 0 auto;
    // width: 100%; 
    // height: 100%; 
    // position: relative"

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
        flex-direction: column;
    }
`;

export const FormWrapper = styled(Form)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    row-gap: 44px;
`;

export const FormTitle = styled(Title)`
display: block;
  &.ant-typography {
    
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 700;
    text-align: left;
    margin-bottom:0;
    
  }
`;

export const FormDescription = styled(Text)`
  display: flex;
  text-align: left;

  column-gap: 8px;
  margin-top: -8px;
  margin-bottom: 24px;
  color: ${theme.colors.textPrimary};
  font-size: 1.5rem;
`;


export const CommentInput = styled(TextArea)`
  &.ant-input-affix-wrapper {
    border-radius: 2px;
    border: 1px solid ${theme.colors.borderInput};
    background: ${theme.colors.white};
  }

  &.ant-input-affix-wrapper textarea.ant-input {
    padding: 12px 16px;
    // font-size: ;
    background: ${theme.colors.white};
  }
`;

export const ButtonDiv = styled.div`
      width: 100%; 
      marginTop: 20px;
      display: flex; 
      align-items: center;
      justify-content: center;
 `;
export const FormItem = styled(Form.Item)<{$width?: string;}>`

    width: ${({ $width }) => $width || '100%'};
    &.ant-form-item {
        padding: 12px 0 12px 0;
        margin: 0;
        margin-bottom: 0px;
        ${({ theme }) => theme.breakpoints.down('sm')} {
            margin-bottom: 0px;
            width: 100%
        }
    }

    &.ant-form-item:last-child {
        

        ${({ theme }) => theme.breakpoints.down('xs')} {
            margin-top: 28px;
        }
    }

    & .ant-form-item-row {
        position: relative;
        width: 100%;

        &:has(.ant-form-item-explain-error:not(:empty)) .ant-form-item-label label {
            color: ${theme.colors.error};
        }

        &:has(input:-webkit-autofill),
        &:has(input:-webkit-autofill:hover),
        &:has(input:-webkit-autofill:focus),
        &:has(input:not(:placeholder-shown)),
        &:has(input:focus) {
            & .ant-form-item-label {
                top: -2px;
                left: 0px;
                padding: 0 10px;
                background-color: ${theme.colors.white};
            }

            & label {
                color: ${theme.colors.primary};
            }
        }
    }

    

    & .ant-form-item-control {
        position: relative;

        & .ant-form-item-control-input + div {
            position: relative;
            top: 100%;
            left: 0;
        }
    }

    & .ant-select-selector,
    & .ant-select,
    & .ant-picker{
        height: 44px;
        text-align: left;
    }

    & .ant-input,
    & .ant-input-number-input,
    & .ant-input-password,
     {  
        padding: 12px;
        font-size: 1.6rem;
        
        border-radius: 6px;
        border-color: ${theme.colors.border};

        &:hover,
        &:focus {
            border-color: ${theme.colors.primary};
        }
    }

    & .ant-form-item-explain-error {
        margin-top: 2px;
        margin-bottom: 5px;
        color: ${theme.colors.error};
        font-size: 1.4rem;
        text-align: left;
        line-height: 1.6;
    }
`;

export const DeleteButton = styled(Button)`
    width: 5px; 
    margin: 16px 0px; 
    padding: 0;
    align-item: center;
    ${({ theme }) => theme.breakpoints.down('sm')}{
      width: 100%;
      margin: 0px auto;
    }
  `
export const ReviewContainer = styled(Card)`
  width: 100%;
  background: ${theme.colors.secondary};
  padding: 5%;
  margin-top: 24px;
  border-radius: 25px;
  
    & .ant-card-body{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ${({ theme }) => theme.breakpoints.down('xs')}{
      flex-direction: column;
    }
  }
  `






