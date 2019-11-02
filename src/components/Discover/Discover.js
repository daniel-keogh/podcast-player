import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <NavBar title="Discover" />
        );
    }
}

export default Discover;