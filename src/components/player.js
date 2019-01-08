import React, { Component } from 'react';
import styled from 'styled-components';
import Hls from 'hls.js';

const PlayerWrapper = styled.div`
    position: relative;
`;

const PlayerInner = styled.span``;

const Container = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 15px;
`;

const ChannelList = styled.div`
    display: flex;
    flex-direction: column;
    list-style: none;

    > li {
        cursor: pointer;
        font-size: 1.25rem;
        margin-top: 1rem;
        padding-top: 1rem;
        text-transform: capitalize;

        &:not(:first-of-type) {
            border-top: 1px solid lightgray;
        }
    }
`;

const VideoTitle = styled.h2`
    font-size: 22px;
    color: rgba(0, 0, 0 , 0.7);
    line-height: 25px;
    font-weight: 400;
    margin-top: 1rem;
    text-transform: capitalize;
`
const VideoLiveButtonTitle = styled.span`
    /* display: inline-block; */
    border: 1px solid red;
    color: #fff;
    background: tomato;
    padding: 2px 10px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 5px;
    font-weight: 400;
`;

const channels = [
    { id: 1, name: 'deporte' },
    { id: 2, name: 'cocina' },
    { id: 3, name: 'tecnologia' }
]

export default class Player extends Component {
    state = {
        liveChannel: 'deporte'
    }

    loadVideo = () => {
        console.log(this.state.liveChannel);
        const { liveChannel } = this.state;
        const streamURL = `http://localhost:3002/live/${liveChannel}/index.m3u8`;
        console.log(this.props);

        if (Hls.isSupported() && this.player) {
            const video = this.player;
            video.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });

            const hls = new Hls();
            hls.loadSource(streamURL);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                video.play();
            });
        } else {
            this.player.src = streamURL;
        }
    }

    componentDidMount() {
        this.loadVideo();
    }

    _onTouchInsidePlayer = () => {
        if (this.player.paused) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }

    render() {
        const style = {
            width: 640,
            height: 360,
            background: '#000',
        }
        return (
            <Container>
                <PlayerWrapper>
                    <PlayerInner>
                        <video
                            controls={false}
                            onClick={this._onTouchInsidePlayer}
                            style={style}
                            ref={(player) => this.player = player}
                            autoPlay={true} />
                    </PlayerInner>
                    <VideoTitle>
                        <b>{this.state.liveChannel}</b>
                        <VideoLiveButtonTitle>En Vivo</VideoLiveButtonTitle>
                    </VideoTitle>
                </PlayerWrapper>
                <ChannelList>
                    <h4>Channels</h4>
                    {channels.map(channel => (
                        <li key={channel.key} onClick={() => this.setState({ liveChannel: channel.name }, this.loadVideo)}>
                            {channel.name}
                        </li>
                    ))}
                </ChannelList>
            </Container>
        );
    }
}