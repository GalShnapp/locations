import { sequelize } from "../db/connector.mjs";

export default async function getNeigborhoodwithRadiousFromDistance(pos = [38.897675, -77.036547], radius) {
    // d(p,q) sqrt((p1-q1)^2 + (p2-q2)^2)
    const Q = `
SELECT 
    neigborhood, 
    state, 
    city, 
    averageAge, 
    distanceFromCityCenter, 
    averageIncome, 
    publicTransportAvailability, 
    latitude, 
    longitude 
FROM (
    SELECT 
        neigborhood, 
        state, 
        city, 
        averageAge, 
        distanceFromCityCenter, 
        averageIncome, 
        publicTransportAvailability, 
        latitude, 
        longitude, 
        sqrt(pow(latitude - ${pos[0]}, 2) + pow(longitude - ${pos[1]}, 2)) AS dist 
    FROM 
        Neigborhoods
)n
WHERE n.dist < ${radius}
`
    return sequelize.query(Q);

}
