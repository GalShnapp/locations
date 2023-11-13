export default function limitBreakdown(query) {
    if (query['limit'])
        return {limit: query['limit']}
    return {}
}