module.exports = {
    Query: {
        async weightedData(_, {input}, ctx) {
            const keys = Object.keys(input)
            if(!keys.length){
                return ctx.SqlData.getWeightedCategory()
            }
            return ctx.SqlData.getWeightedCategory(input.data_key)
        },
        async petsData(_, __, ctx){
            console.log('in pets data')
            return ctx.SqlData.createPetModel.findMany()
        },
        // async petsAdd(_,{input}, ctx){
        //     return ctx.SqlData.createPetModel.create(input)
        // }
    }
}