import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AuthPlugin from "./plugins/auth";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
// import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from 'apollo-link-ws';


Vue.use(AuthPlugin);
Vue.use(VueApollo)

Vue.config.productionTip = false;
const getHeaders = () => {
  const headers = {};
  const token = window.localStorage.getItem('apollo-token');
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return headers
}

//Create an http link : 
// const link = new  HttpLink({
//   uri : 'http://localhost:8080/v1/graphql',
//   fetch,
//   headers: getHeaders()
// });

   // Create a WebSocket link:
  const link = new WebSocketLink({
    uri: 'wss://hasura.io/learn/graphql',
    // uri: 'wss://localhost:8080/v1/graphql',
    options: {
      reconnect: true,
      timeout: 3000,
      connectionParams: () => {
        return { headers: getHeaders() };
      },
    }
  });


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename :true
  })
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});


new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
