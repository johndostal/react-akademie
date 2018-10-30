import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";

const Trans = styled.tr`
  background-color: ${props => (props.id % 2 === 0 ? "blue" : "")};
`;

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

const Edit = styled.td`
  text-align: right;
  width: 10px;
`;

const Transaction = ({ name, type, value, id, deleteMethod, editMethod }) => {
  return (
    <Trans key={id}>
      <Name>{name}</Name>
      <Type type={type}>{type}</Type>
      <Value>{value}</Value>
      <Edit>
        <Button color="secondary" onClick={() => editMethod(id)}>
          Edit
        </Button>
        <Button color="danger" onClick={() => deleteMethod(id)}>
          Remove
        </Button>
      </Edit>
    </Trans>
  );
};

export default Transaction;

// rfce
