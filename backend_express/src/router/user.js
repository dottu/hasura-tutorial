const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()

const HASURA_OPERATION1 = `
mutation MyMutation($name:String!) {
  insert_users_one(object: {
    name: $name
  }){
    id
    name
  }
}
`;

// execute the parent operation in Hasura
const execute = async (variables) => {
  const fetchResponse = await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: 'POST',
      body: JSON.stringify({
        query: HASURA_OPERATION1,
        variables
      })
    }
  );
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};
  

// Request Handler
router.post('/', async (req, res) => {

  // get request input
  const { name } = req.body.input;

  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await execute({ name }, req.headers);

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0])
  }

  // success
  return res.json({
    ...data.insert_users_one
  })

});

const HASURA_OPERATION = `
mutation MyMutation($int:Int!,$name: String!) {
  update_users(where: {id: {_eq: $int}}, _set: {name: $name}){
    affected_rows
  }
}
`;

// execute the parent operation in Hasura
const execute1 = async (variables) => {
  const fetchResponse = await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: 'POST',
      body: JSON.stringify({
        query: HASURA_OPERATION,
        variables
      })
    }
  );
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};
  

// Request Handler
router.post('/update', async (req, res) => {

  // get request input

  const { int, name } = req.body.input;

  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await execute1({ int, name });
  
  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0])
  }

  // success
  return res.json({
    ...data.update_users
  })

});

module.exports = router