import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgb(69, 73, 78);
`;

export const Input = styled.input`
  width: 60%;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 10px 15px;
  text-align: center;
  box-shadow: 2px 2px 5px 3px rgb(233, 169, 162);

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  @media screen and (min-width: 1200px) {
    width: 35%;
  }
`;

export const Button = styled.button`
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: rgb(191, 191, 183);
  box-shadow: 1px 1px 5px 3px rgb(233, 169, 162);
  cursor: pointer;
`;
