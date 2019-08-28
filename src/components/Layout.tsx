import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

const Layout: React.FC = props => {
  return <LayoutContainer>{props.children}</LayoutContainer>;
};

export default Layout;
