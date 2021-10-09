import {VehicleApi, ZoneApi, VehicleResponse} from "@mhauri/tier-api-client"
import {Client} from "@util/Client";
const vehicleApi = new VehicleApi(Client);
const zoneApi = new ZoneApi(Client);

export async function getVehicleDetails(id): VehicleResponse {
    vehicleApi.showVehicle(id, function (error, data): void {
        if (!error) {
            return data;
        }
    });
}

export async function getVehicleIds() {
    vehicleApi.listVehicle('BERN', function (error, data) {
        if (!error) {
            return data;
        }
    });

    // return vehicles.map(function (item) {
    //     return item.id;
    // });
}