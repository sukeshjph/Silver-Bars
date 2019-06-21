# Silver Bars Marketplace
The Project is built using Babel 7(Supports Typescript), Typescript 3.5, Webpack 4, Node.js 8, Express, Jest

# Build steps(Webpack and babel):
1) npm install to install all dependencies
2) npm run start(Nodemon watch) --> Dev mode
3) npm run build(To produce final bundle using webpack) 
4) npm run serve --> Prod mode uses the emiited bundle 

# Unit test(Jest)
1) Project uses Facebook jest for unit testing
2) Run -> npm run test
3) Run -> npm run coverage

# Type check(Typescript)
1) Code is strongly types thanks to Typescript
2) Run -> npm run type-check

# API Docs
1) Register Order(/api/registerOrder):
      Post request with body(application/json) i.e.

      {
	    "order":{
          "userId": "166666",
          "quantity": 3.98,
          "price": 300,
          "orderType": "SELL"
        }
      }
2) Cancel Order(/api/cancelOrder):
   Post request with body(application/json) i.e.

      {
	    "order":{
          "userId": "166666",
          "quantity": 3.98,
          "price": 300,
          "orderType": "SELL"
        }
      }

3) Get order Summary(/api/getOrderSummary):
     A get Request that returns the array of Buy and sell orders as per the requirement.
     UI like React or Angular need to parse and show.











