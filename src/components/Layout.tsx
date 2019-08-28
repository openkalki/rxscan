import React from "react";
import styled, { StyledFunction } from "styled-components";

interface LayoutProps {
  padding?: string;
}

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  padding: ${props =>
    props.padding !== "undefined" ? props.padding : "0 20px"};
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

const Layout: React.FC<LayoutProps> = props => {
  return <LayoutContainer {...props}>{props.children}</LayoutContainer>;
};

export default Layout;
