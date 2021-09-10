const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()

const HASURA_INSERT = `
mutation MyMutation($user_id: Int!, $name:String!) {
  insert_todos_one(object: {name: $name, user_id: $user_id}) {
    name
    id
    user_id 
  }
}
`;

// execute the parent operation in Hasura
const execute4 = async (variables) => {
  const fetchResponse = await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: 'POST',
      body: JSON.stringify({
        query: HASURA_INSERT,
        variables
      })
    }
  );
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};
  

// Request Handler
router.post('/todo/create', async (req, res) => {

  // get request input
  const {  name ,user_id} = req.body.input;
  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await execute4({ name , user_id},req.headers);

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0])
  }

  // success
  return res.json({
    ...data.insert_todos_one
  })

});

const HASURA_OPERATION = `
query MyQuery {
  role {
    id
    role
    user_Id
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
router.post('/todo/list', async (req, res) => {

  // get request input
  const { id } = req.body.input;

  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await execute({ id });

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0])
  }

  // success
  return res.json({
    ...data.role
  })

});

module.exports = router