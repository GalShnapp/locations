import { Neigborhood } from "./models.mjs";
import fs from 'fs';

export default async function initDB() {
    await Neigborhood.sync({ force: true })
    const data = fs.readFileSync('./db/neighborhoods_data.json')
    const json = JSON.parse(data)
    Neigborhood.bulkCreate(json.map(n => {
        return {
            neigborhood: n.neigborhood,
            state: n.state,
            city: n.city,
            averageAge: Number(n["average age"]),
            distanceFromCityCenter: Number(n["distance from city center"]),
            averageIncome: Number(n["average income"]),
            publicTransportAvailability: n["public transport availability"],
            latitude: Number(n["latitude"]),
            longitude: Number(n["longitude"])
        }
    }))
}