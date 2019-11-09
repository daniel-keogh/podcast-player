import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class Podcast extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <NavBar title="Podcast" />
                <p>This is the podcast Component</p>
            </React.Fragment>
        );
    }
}

export default Podcast;