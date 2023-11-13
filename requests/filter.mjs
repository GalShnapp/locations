import { Op } from "sequelize";

const queryOpToOp = {
    "eq": Op.eq,
    "ne": Op.ne,
    "gt": Op.gt,
    "lt": Op.lt,
    "gte": Op.gte,
    "lte": Op.lte    
}

export default function filterBreakdown(query) {

    const queryWhere = { where: {}}
    Object.entries(query)
    .filter(([key]) => key.startsWith('filter['))
    .forEach(([key, value]) => {
        try {
            const [ _, filterKey, filterOp] = key.match(/filter\[(\w+),(\w{2,3})\]/);
            queryWhere.where[filterKey] = {[queryOpToOp[filterOp]]: value}
        } catch {
            const err = new Error('invalid filter expression')
            err.arg = `${key}=${value}`
            err.statusCode = 400
            throw err
        }
        
    });
    

    return queryWhere
}