import React from 'react';
import styled from 'styled-components';
import { borderColor, headerHeight, containerMaxWidth } from "./theme";
import Player from './player';

const AppWrapper = styled.div `

`;

const Container = styled.div `
    max-width: ${containerMaxWidth}px;
    margin: 0 auto;
`;

const Header = styled.div `
        height: ${headerHeight}px;
        border-bottom: 1px solid ${borderColor};
`;

const Main = styled.div `
    padding: 20px 0;

`;

const Footer = styled.div `
    border-top: 1px solid ${borderColor};
    padding: 10px 0;
`;

const Copyright = styled.p`
    font-size: 12px;
    text-align: center;
`;

const HeaderTitle = styled.div `
    font-size: 35px;
    font-weight: 800;
    line-height: ${headerHeight}px;
    flex-grow: 1;
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
`;

const HeaderWrapper = styled.div `
    display: flex;
`;

export default class App extends React.Component {
    render() {
        return (
            <AppWrapper>
                <Header>
                    <HeaderWrapper>
                        <HeaderTitle>TWCAM Live Streaming</HeaderTitle>
                    </HeaderWrapper>
                </Header>
                <Main>
                    <Container>
                        <Player />
                    </Container>
                </Main>
                <Footer>
                    <Container>
                        <Copyright>&copy; 2019 TWCAM.</Copyright>
                    </Container>
                </Footer>
            </AppWrapper>
        );
    }
}