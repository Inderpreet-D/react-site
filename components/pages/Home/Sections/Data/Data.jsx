import styled from "styled-components";

const Data = ({ data, idx }) => (
  <div>Data {JSON.stringify({ data, idx }, null, 2)}</div>
);

export default Data;
