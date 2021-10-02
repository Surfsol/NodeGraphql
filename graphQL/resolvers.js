module.exports = {
    Query: {
        async weightedData(_, {input}, ctx) {
            const keys = Object.keys(input)
            if(!keys.length){
                return ctx.SqlData.getWeightedCategory()
            }
            return ctx.SqlData.getWeightedCategory(input.data_key)
        }
    }
}