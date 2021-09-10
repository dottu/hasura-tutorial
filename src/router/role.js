const fetch = require('node-fetch')
const express = require('express')

const router = express.Router()


const HASURA_ROLE = `
mutation MyMutation($role:String!, $user_Id : Int!) {
  insert_role_one(object: {role: $role, user_Id:$user_Id }) {
    id
    role
    user_Id
  }
}
`;

// execute the parent operation in Hasura
const rolee = async (variables) => {
  const fetchResponse = await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: 'POST',
      body: JSON.stringify({
        query: HASURA_ROLE,
        variables
      })
    }
  );
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};
  

// Request Handler
router.post('/role/create', async (req, res) => {

  // get request input
  const { role, user_Id } = req.body.input;

  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await rolee({ role, user_Id });

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0])
  }

  // success
  return res.json({
    ...data.insert_role_one
  })

});

module.exports = router