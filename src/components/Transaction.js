import React from "react";
import styled from "styled-components";

const Trans = styled.tr``;

const Name = styled.td`
  width: 160px;
`;

const Type = styled.td`
  width: 100px;
  background-color: ${props => (props.type === "income" ? "green" : "red")};
`;

const Value = styled.td`
  text-align: right;
  padding-left: 10px;
  width: 70px;
`;

const Transaction = ({ name, type, value, id }) => (
  <Trans>
    <Name>{name}</Name>
    <Type type={type}>{type}</Type>
    <Value>{value}</Value>
  </Trans>
);

export default Transaction;

// rfce
