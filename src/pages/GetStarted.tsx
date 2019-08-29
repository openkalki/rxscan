import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
//@ts-ignore
import { Heading, Button } from "@kiwicom/orbit-components";
import { Link } from "react-router-dom";

const GetStartedInnerContainer = styled.div`
  width:100%
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #EEE;
`;

const StartButton = styled(Button)``;

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
