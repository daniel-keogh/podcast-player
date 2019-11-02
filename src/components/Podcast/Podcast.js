import React, { Component } from 'react';
import NavBar from '../NavBar';

class Podcast extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return (
            <NavBar title="Podcast" />
        );
    }
}
 
export default Podcast;