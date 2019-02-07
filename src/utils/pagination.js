module.exports = function paginate(data, _num, _skip) {
    const skip = _skip === undefined
        ? 0
        : parseInt(_skip, 10);
    
    const num = _num === undefined
        ? data.length
        : parseInt(_num, 10);
    
    const results = data.slice(skip, skip + num);
    return {
        hasMore: data.length > skip + num,
        num: results.length,
        results,
    }
}
