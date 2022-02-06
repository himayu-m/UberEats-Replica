import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div className="footer">
                    <h2>Uber<span style={{color:"#06c167", marginLeft:4}}>Eats</span></h2>
                    <p style={{marginTop:"-5vh",textAlign:'right',fontSize:13}}>© 2021 Uber Technologies Inc.</p>
                </div>
            </div>
        )
    }
}
