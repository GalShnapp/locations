import { Sequelize } from "sequelize";
import { publicTransportAvailabilityOptions, Neigborhood } from "../db/models.mjs";

const customOrder = (column, values, direction) => {
    let orderByClause = 'CASE ';
  
    for (let index = 0; index < values.length; index++) {
      let value = values[index];
  
      if (typeof value === 'string') value = `'${value}'`;
  
      orderByClause += `WHEN ${column} = ${value} THEN '${index}' `;
    }
  
    orderByClause += `ELSE ${column} END`
  
    return [Sequelize.literal(orderByClause), direction]
};

const createError = (s) => {
    const err = new Error('invalid sort expression')
    err.arg = s
    err.statusCode = 400
    return err
}

export default function sortBreakdown(query) {
    if (query['sort']) {
        return  { order: query.sort
            .split(',')
            .map(s => {
                try {
                    const [sortBy, sortDirection] = s.split('.');
                    if (sortBy === 'publicTransportAvailability')
                        return [customOrder(
                                    'publicTransportAvailability',
                                    publicTransportAvailabilityOptions,
                                    sortDirection.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
                                )]

                    if (Object.keys(Neigborhood.getAttributes()).includes(sortBy))
                        return [sortBy, sortDirection.toLowerCase() === 'desc' ? 'DESC' : 'ASC'];

                    throw createError(s)
                } catch {
                    throw createError(s)
                }
            })}
    }

    return {}
}