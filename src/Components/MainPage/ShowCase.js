import React from 'react';


const caseStyle = {
    display: '',
    background: "url(" + require("./BG.jpg") + ") center",
    backgroundSize: 'cover',
    height: '50vh',
    textAlign: 'center',
    lineHeight: '50vh',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    fontFamily: 'Pacifico, cursive',
    fontSize: '12vh',
    color: '#FFFFFF',
    textShadow: '6px 6px #ffc0ad,-6px -6px #ffc0ad, 6px -6px #ffc0ad, -6px 6px #ffc0ad'
}


let url = 'BG.jpg'
const ShowCase = () => {
    return (
        <div style={caseStyle}>
            Yummy
        </div>
        
    )
}

export default ShowCase;