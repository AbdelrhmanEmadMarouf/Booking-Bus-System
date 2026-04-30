const {sql} = require('../../config'); 

const getDriverTrips = async(driverId)=>{
    const trips =  await sql.query`
                SELECT t.trip_id ,
                t.scheduled_departure_date ,
                b.plate_no as bus_plate_no,
                count(ticket_id) as total_passengers,
                s1.name as start_station,
                s2.name as end_station
                FROM trip t 
                JOIN bus b on b.bus_id = t.bus_id
                JOIN ticket tk on tk.trip_id = t.trip_id
                JOIN route r on r.route_id = t.route_id
                JOIN station s1 on r.origin_station_id= s1.station_id
                JOIN station s2 on r.destination_station_id = s2.station_id
                WHERE driver_id = ${driverId}
                GROUP BY
                t.trip_id,
                t.scheduled_departure_date,
                b.plate_no,
                s1.name,
                s2.name
        `;

        return trips.recordset

}


module.exports = {
    getDriverTrips
}