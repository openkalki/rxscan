import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
//@ts-ignore
import { Heading, Button } from "@kiwicom/orbit-components";
import { Link } from "react-router-dom";

const GetStartedInnerContainer = styled.div`
  background: blue;
  flex: 1;
`;

const StartButton = styled(Button)`
  margin: 0 auto;
`;

const GetStarted: React.FC = props => {
  return (
    <Layout>
      <GetStartedInnerContainer>
        <Heading type="display" spaceAfter="large">
          RxScan
        </Heading>
        <div>
          <Link to="/scan-medicine/">
            <StartButton size="large">Scan Prescription</StartButton>
          </Link>
        </div>
      </GetStartedInnerContainer>
    </Layout>
  );
};

export default GetStarted;
