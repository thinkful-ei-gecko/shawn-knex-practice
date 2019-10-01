require('dotenv').config();
const knex = require('knex');

//sets knexInstance with required connection info
const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
  });

//DRILL 1:  A function that takes one parameter for searchTerm which will be any string.  The function will query the shopping_list table using Knex methods and select the rows which have a name that contains the searchTerm using a case insensitive match.
function searchNameFor(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}`)
        .then(result => {
            console.log(result)
        })
};

//DRILL 2:  A function that takes one parameter for pageNumber which will be a number.  The function will query the shopping_list table using Knex methods and select the pageNumber page of rows paginated to 6 items per page.
function paginator(pageNumber){
    const productsPerPage = 6;
    const offset = productsPerPage * (pageNumber -1);
    knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
        console.log(result)
    })
};


//DRILL 3:  A function that takes one parameter for daysAgo which will be a number representing a number of days.  This function will query the shopping_list table using Knex methods and select the rows which have a date_added that is greater than the daysAgo.
function olderThan(daysAgo){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .orderBy('date_added', 'ASC')
        .then(result => {
            console.log(result)
        })
};


//DRILL 4:  A function that takes no parameters.  The function will query the shopping_list table using Knex methods and select the rows grouped by their category and showing the total price for each category.
function priceByCategory() {
    knexInstance
        .select('*')
        .from('shopping_list')
        .groupBy('category', 'id')
        .orderBy([
            { column: 'category', order: 'ASC'},
            { column: 'price', order: 'DESC'}
        ])
        .then(result => {
            console.log(result)
        })
};



//DRILL 1:
//searchNameFor('bUrGeR');

//DRILL 2:
//paginator(1);

//DRILL 3:
//olderThan(2);

//DRIL 4:
//priceByCategory();