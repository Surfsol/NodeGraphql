const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  scalar JSON

  type WeightedData {
    data_id: Int
    cell_num_id: String
    sess_id: Int
    data_key: String
    data_value_id: Int
    index_position: Int
    created_date: Date
    weight: Int
    month: Int
    year: Date
    sum: Float
    value_name:String
  }

  type WeightedFiltered {
    filters: String
    cell_country: String
    cross_product: Float
    key_name: String
    value_name: String
    dateyear: Int
    datemonth: Int
    sum_weight: Float
    crossProductWeight: Float
    data_id: Int
    cell_num_id: String
    sess_id: Int
    data_key: String
    data_value_id: Int
    created_date: Date
    weight: Int
    month: Int
    year: Date
    sum: Float
    sum1: Float
    sum2: Float
  }

  type TraderSession {
    id: Int
    gender: String
    age: String
    education: String
    crossing_freq: String
    crossing_location: String
    produce: String
    primary_income: String
    language: String
    country_of_residence: String
    procedurecommodity: String
    procedurecommoditycat: String
    proceduredest: String
    procedurerequireddocument: String
    procedurerelevantagency: String
    procedureorigin: String
    commoditycountry: String
    commoditymarket: String
    commoditycat: String
    commodityproduct: String
    exchangedirection: String
    created_date: Date
  }



  input newWeightedInput {
    data_id: Int
    cell_num_id: Int
    sess_id: Int
    data_key: String
    data_value_id: Int
    index_position: Int
    created_date: Date
    weight: Float
    month: Int
    year: Date
    sum: Float
    value_name: String
  }

  input newWeightedFilteredInput {
    data_key: String
    filters: [String!]!
  }

  type Query {
    weightedData(input: newWeightedInput): [WeightedData]!
    weightedFiltered(input: newWeightedFilteredInput): [WeightedFiltered]!
  }


`;

module.exports = typeDefs;