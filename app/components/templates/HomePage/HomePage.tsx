import React, {useEffect, useState} from "react"
import styles from './HomePage.module.scss';
import mapStyles from '@module/Map/Map.module.css';
import Map from '@module/Map/index'
import {Client} from '@util/Client';
import {VehicleApi} from '@mhauri/tier-api-client';

const DEFAULT_CENTER = [46.941338, 7.477052]

const HomePage = () => {
    const [markers, setMarkers] = useState([]);

    const api = new VehicleApi(Client);
    const listVehicles = async function () {
        api.listVehicle(function(error, data) {
            if (error) {
                //console.error(error);
            } else {
                const positions = [];
                data.map(function(vehicle) {
                    positions.push([vehicle.attributes.latitude,vehicle.attributes.longitude])
                });
               setMarkers(positions);
            }
        });
    }
    if(markers.length === 0) {
        listVehicles();
    }
    return (<div className={styles.content}>
        <Map className={mapStyles.map} center={DEFAULT_CENTER} zoom={14}>
            {({TileLayer, Marker, Popup}) => (
                <>
                    <TileLayer
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {markers.map((position, idx) =>
                        <Marker key={`marker-${idx}`} position={position}>
                            <Popup>
                                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                            </Popup>
                        </Marker>
                    )}
                </>
            )}
        </Map>
    </div>);
}


export default HomePage;
