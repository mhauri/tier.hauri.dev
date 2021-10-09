import React, {useEffect, useState} from "react"
import styles from '@module/Map/Map.module.css';
import Map from '@module/Map/index'
import {Client} from '@util/Client';
import {VehicleApi, ZoneApi} from '@mhauri/tier-api-client';


const TierMap = ({zone}) => {
    const [markers, setMarkers] = useState([]);
    const [zones, setZones] = useState([]);
    const [center, setCenter] = useState([]);
    const vehicleApi = new VehicleApi(Client);
    const zoneApi = new ZoneApi(Client);
    const listVehicles = async function () {
        vehicleApi.listVehicle(zone, function(error, data): void {
            if (error) {
                //console.error(error);
            } else {
                setMarkers(data);
            }
        });
    }

    const listZones = async function () {
        zoneApi.listZone(zone, function(error, data): void {
            if (error) {
                //console.error(error);
            } else {
                setZones(data);
                setCenter([data[0].attributes.latitude, data[0].attributes.longitude])
            }
        });
    }

    if(center.length === 0) {
        listZones();
        listVehicles();
        return (<></>)
    }
    return (
        <Map className={styles.map} center={center} zoom={14}>
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
        </Map>);
}

export default TierMap;
