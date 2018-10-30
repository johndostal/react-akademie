import React from "react";
import styled from "styled-components";

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

const Id = styled.td`
  text-align: right;
  width: 10px;
`;

const Transaction = ({ name, type, value, id, deleteMethod }) => {
  return (
    <Trans key={id}>
      <Name>{name}</Name>
      <Type type={type}>{type}</Type>
      <Value>{value}</Value>
      <Id>
        <button className="btn btn-danger" onClick={() => deleteMethod(id)}>
          Remove
        </button>
      </Id>
    </Trans>
  );
};

export default Transaction;

// rfce
