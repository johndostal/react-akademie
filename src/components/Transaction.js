import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";

const Created = styled.td`
  width: 100px;
`;

const Name = styled.td`
  width: 160px;
`;

const Type = styled.td`
  width: 100px;
  color: white;
  background-color: ${props => (props.type === "income" ? "green" : "red")};
`;

const Value = styled.td`
  text-align: right;
  padding-left: 10px;
  width: 70px;
`;

const Delete = styled.td`
  text-align: right;
  width: 10px;
`;

const Transaction = ({ created, name, type, value, id, deleteMethod }) => {
  let date = new Date();
  date.setTime(created);

  return (
    <tr key={id}>
      <Created>{date.toLocaleString()}</Created>
      <Name>{name}</Name>
      <Type type={type}>{type}</Type>
      <Value>{value}</Value>
      <Delete>
        <Button color="danger" onClick={() => deleteMethod(id)}>
          Remove
        </Button>
      </Delete>
    </tr>
  );
};

export default Transaction;
