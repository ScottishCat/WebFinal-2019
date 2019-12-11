import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = (props)=>{
    const [selected, setSelect] = useState(null);
    
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("lng")) }}>
            <Marker 
            key='#123456'
            position={{ lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("lng")) }}
            onClick={() => {setSelect(true)}}
            />
            {selected && (
                <InfoWindow 
                position={{ lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("lng")) }}
                onCloseClick ={() =>{setSelect(false)}}>
                    <div>
                        Some Detail Information
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapWindow = (props) => {
    return (
        <div style={{ 
            width: '100%', 
            height: '30vh' }}>
            <WrappedMap
                googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDy6UiT7wnGpImKxRge49xNpSdxTVWWQe8"}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} 
                lat={33.4556129678}
                lng={-112.3955963552}/>}
            />
        </div>
    )
}

export default MapWindow;