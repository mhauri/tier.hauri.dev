import React, {useEffect, useState} from "react"
import styles from '@module/Map/Map.module.css';
import Map from '@module/Map/index'
import {Client} from '@util/Client';
import {VehicleApi, ZoneApi} from '@mhauri/tier-api-client';

const TierMap = ({zoneId}) => {
    const [markers, setMarkers] = useState([]);
    const [zones, setZones] = useState([]);
    const [center, setCenter] = useState([]);
    const vehicleApi = new VehicleApi(Client);
    const zoneApi = new ZoneApi(Client);
    const noParking = {color: 'red'}
    const speedReduction = {color: 'gray', fillColor: 'orange'}
    const noColor = {color: 'transparent'}

    const listVehicles = async function () {
        vehicleApi.listVehicle(zoneId, function (error, data): void {
            if (error) {
                //console.error(error);
            } else {
                setMarkers(data);
            }
        });
    }

    const listZones = async function () {
        zoneApi.listZone(zoneId, function (error, data): void {
            if (error) {
                //console.error(error);
            } else {
                setZones(data);
                setCenter([data[0].attributes.latitude, data[0].attributes.longitude])
            }
        });
    }

    if (center.length === 0) {
        listZones();
        listVehicles();
        return (<></>)
    }
    return (
        <Map className={styles.map} center={center} zoom={14}>
            {({TileLayer, Marker, Popup, Polygon}) => (
                <>
                    <TileLayer
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {markers.map((vehicle, idx) =>
                        <Marker key={`marker-${idx}`}
                                position={[vehicle.attributes.latitude, vehicle.attributes.longitude]} opacity={vehicle.attributes.state === 'ACTIVE' ? 0.95 : 0.4}>
                            <Popup>
                                <table>
                                    <tr>
                                        <td><strong>Tier Code:</strong></td>
                                        <td>{vehicle.attributes.code}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td>{vehicle.attributes.state}</td>
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
                    {zones.map((zone, idx) =>
                        zone.attributes.zoneConstraints.length === 0 ?
                        <Polygon key={`zone-${idx}`} positions={zone.attributes.polygon} pathOptions={noColor}/>
                            : zone.attributes.zoneConstraints.includes('speedReduction') ? <Polygon key={`zone-${idx}`} positions={zone.attributes.polygon} pathOptions={speedReduction}/>
                            : <Polygon key={`zone-${idx}`} positions={zone.attributes.polygon} pathOptions={noParking}/>

                    )}
                </>
            )}
        </Map>);
}

export default TierMap;
