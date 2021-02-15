import styled from "styled-components";

const Date = ({ data, idx }) => (
  <div>Date {JSON.stringify({ data, idx }, null, 2)}</div>
);

export default Date;
