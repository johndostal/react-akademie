import React from "react";

const Record = ({ item: { name, type, value } }) => (
  <tr>
    <td>{name}</td>
    <td>{type}</td>
    <td>{value}</td>
  </tr>
);

export default Record;

// rfce
