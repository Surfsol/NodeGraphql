const db = require("../dbConfig");
const knexConfig = ("../knexfile")
const knex = require("knex")(knexConfig);

const getWeighted = () => {
    return db("databank_data").distinct("cell_num_id");
  };
  const year = knex.raw("year(created_date) as year");
  const month = knex.raw("month(created_date) as month");
  
  const getWeightedFiltered = input => {
    const {data_key, filters} = input
    console.log({data_key, filters})
    let filtersArray = []
    for(let i=0;i<filters.length; i++){
      const itemArray = filters[i].split(':')
      let obj = {}
      obj.cat = itemArray[0]
      obj.fil = itemArray[1]   
      filtersArray.push(obj)
    } 
   
    return db
      .select("*")
      .from(function () {
        this.select("cell_num_id")
        .sum("weight as sum_weight")
          .from("databank_data")
          .innerJoin(
            "databank_data_keys",
            "databank_data.data_key_id",
            "databank_data_keys.key_id"
          )
          .innerJoin("databank_data_values", function () {
            this.on(function () {
              this.on(
                "databank_data.data_value_id",
                "=",
                "databank_data_values.value_id"
              );
              this.andOn(
                "databank_data.data_key_id",
                "=",
                "databank_data_values.key_id"
              );
            });
          })
          .select(year)
          .select(month)
          .select("databank_data_keys.key_id")
          .select("databank_data_keys.key_name")
          .select("databank_data_values.value_id")
          .select("databank_data_values.value_name")
          .where("databank_data_keys.key_name", data_key)
          .groupBy(
            "cell_num_id",
            "year",
            "month",
            "databank_data_values.value_name"
          )
          .as("t1");
      })
      .innerJoin(
        db
          .select("cell_num_id")
          .sum("weight as sum_weight")
          .from("databank_data")
          .innerJoin(
            "databank_data_keys",
            "databank_data.data_key_id",
            "databank_data_keys.key_id"
          )
          .innerJoin("databank_data_values", function () {
            this.on(function () {
              this.on(
                "databank_data.data_value_id",
                "=",
                "databank_data_values.value_id"
              );
              this.andOn(
                "databank_data.data_key_id",
                "=",
                "databank_data_values.key_id"
              );
            });
          })
          .select("databank_data_keys.key_id")
          .select("databank_data_keys.key_name")
          .select("databank_data_values.value_id")
          .select("databank_data_values.value_name")
          .where({
            "databank_data_keys.key_name": filtersArray[0].cat,
            "databank_data_values.value_name": filtersArray[0].fil
          })
          .groupBy("cell_num_id", "databank_data_values.value_name")
          .as("t2"),
        function () {
          this.on("t1.cell_num_id", "=", "t2.cell_num_id");
        }
      )
    .select("t1.cell_num_id")
    .select("t1.year")
    .select("t1.month")
    .select("t1.key_name")
    .select("t1.value_name")
    .select("t1.sum_weight as sum1")
    .select("t2.sum_weight as sum2")
    .select(knex.raw('(t1.sum_weight * t2.sum_weight) as cross_product'))
    .groupBy("t1.month", "t1.year", "t1.value_name", "t2.value_name");
  };
  
  const getWeightedCategory = category => {
    return db
      .select("*")
      .from("databank_data")
      .innerJoin(
        "databank_data_keys",
        "databank_data.data_key_id",
        "databank_data_keys.key_id"
      )
      .innerJoin("databank_data_values", function () {
        this.on(function () {
          this.on(
            "databank_data.data_value_id",
            "=",
            "databank_data_values.value_id"
          );
          this.andOn(
            "databank_data.data_key_id",
            "=",
            "databank_data_values.key_id"
          );
        });
      })
      .select(month)
      .select(year)
      .sum("weight as sum")
      .select("databank_data_keys.key_name as key_name")
      .select("databank_data_values.value_name")
      .select("databank_data_keys.key_id as key_id")
      .select("databank_data_values.value_id as value_id")
      .where("databank_data_keys.key_name", category)
      .groupBy("year", "month", "value_name");
  };