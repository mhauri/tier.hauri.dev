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
        api.listVehicle(function(error, data): void {
            if (error) {
                //console.error(error);
            } else {
               setMarkers(data);
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
                    {markers.map((vehicle, idx) =>
                        <Marker key={`marker-${idx}`} position={[vehicle.attributes.latitude,vehicle.attributes.longitude]}>
                            <Popup>
                                <table>
                                    <tr>
                                        <td><strong>Tier Code:</strong></td>
                                        <td>{vehicle.attributes.code}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Batterie:</strong></td>
                                        <td>{vehicle.attributes.batteryLevel}%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Max:</strong></td>
                                        <td>{vehicle.attributes.maxSpeed} km/h</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Helmbox:</strong></td>
                                        <td>{vehicle.attributes.hasHelmetBox == true ? <>Ja</> : <>Nein</>}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Helm:</strong></td>
                                        <td>{vehicle.attributes.hasHelmet == true ? <>Ja</> : <>Nein</>}</td>
                                    </tr>
                                </table>
                            </Popup>
                        </Marker>
                    )}
                </>
            )}
        </Map>
    </div>);
}


export default HomePage;
