import Sequelize from "sequelize";
import { sequelize } from "./connector.mjs";
import { Model, DataTypes, INTEGER, FLOAT } from "sequelize";



export const publicTransportAvailabilityOptions = ['none', 'low', 'medium', 'high']
const publicTransportAvailability = Sequelize.ENUM(...publicTransportAvailabilityOptions)

export class Neigborhood extends Model {}

Neigborhood.init({
  // Model attributes are defined here
  neigborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  averageAge: {
    type: INTEGER,
    allowNull: false
  },
  distanceFromCityCenter: {
    type: FLOAT,
    allowNull: false
  },
  averageIncome: {
    type: INTEGER,
    allowNull: false
  },
  publicTransportAvailability: {
    type: publicTransportAvailability,
    allowNull: false
  },
  latitude: {
    type: FLOAT,
    allowNull: false
  },
  longitude: {
    type: FLOAT,
    allowNull: false
  }
  

}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Neigborhood' // We need to choose the model name
});
