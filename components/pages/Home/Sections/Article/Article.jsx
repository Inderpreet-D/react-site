import styled from "styled-components";

const Article = ({ data, idx }) => (
  <div>Article {JSON.stringify({ data, idx }, null, 2)}</div>
);

export default Article;
