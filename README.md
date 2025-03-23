<!--
  AGENTIC CORPORATE TRADER (ACT) SYSTEM
  -----------------------------------
  Note: GitHub’s markdown renderer doesn’t allow embedded custom fonts or CSS,
  so this layout uses standard Markdown formatting to achieve a polished look.
-->

# Agentic-Corporate-Trader-ACT-System

**Stocks Portfolio Manager React App**  
Web app Link - [Agentic Corporate Trader](https://actproject.netlify.app/)

---

## Overview:
Developed the ACT system, an AI-driven platform for corporate and government entities which enables the user to view stock listings, IPO listings, add stocks to watchlist, buy/sell stocks, display the portfolio, stock transaction history and showcase the stock news as well as manage investments in technology stocks and cryptocurrencies.

Server Deployed on Heroku and Firebase deployed on Netlify

---

## Architecture & Technologies
- **JavaScript**, the project's front and backend programing language.
- **React**, a JavaScript library used to assist with efficient management of rapidly changing data and maintaining a single-page web application structure.
- **Node.js**, a runtime environment used to execute JavaScript for server-side scripting.
- **Express.js**, a web application framework, used with Node.js, to provide server-side structure for querying and retrieval of API data.
- **Mongoose**, a javascript library that creates a connection between MongoDB and Node.js.
- **Firebase**, a database system used for storage and management of information.
- **Material-UI/MUI**, a comprehensive styling library that features implementation of Google's Material Design system.
- **Sass, CSS3 and HTML5**, used to manage the presentation and styling of the project.
- **finnhub.io**, a third party finance API that provides real time stock market price, stock news and IPO listings.
- **TradingView**, a REST API that provides real time stock market charts.

---

## Functionality:
- **Landing Page**: Landing Page will show the features that we offer. When you click on any feature, it will prompt to Register/Login first.
- **Register Page**: Register Page will have a form to be filled by user to Create a new account. All form fields has validations.
- **Login**: Login Page for the existing users to login. Once the users successfully Logs in/Registers he will be taken to the Home page.
- **Home Page**: Home page will have stock listings with real time stock value fetched using finnhub.io API. Stocks can be added to watchlist. User can navigate to other section using sidebar and navbar.
- **Watchlist**: Contains user added stocks with real time values such as stock price, volume, day high, day low, etc. User can perform actions such as buy, sell, more stock information and remove stock from watchlist.
- **Buy/Sell Stocks**: User can buy/sell stocks. Validations such as balance check and quantity check has been implemented.
- **Portfolio**: Showcases user with current investment, quantity and profit/loss for each stock holdings and total profit/loss.
- **Stock Information**: Contains realtime stock chart and technical analysis of that stock. Used TradingView API to fetch data.

---

## Folder Structure

### Backend Directory
.
├── app.js                  #  all modules imported in this file and mongoDB connection          
├── server.js               #  Start point of the code
├── api
     ├──controllers         # controllers for each task and are called by routes
     ├──models              # contains the schema of all collections in MongoDB
     ├──routes              # contains the routes according to URL and request methods
     └──services            # contains the business logic of all the operations

### Frontend Directory
frontend
├── src
|   |── Cards               # react components
|   |── Charts              
|   |── components          
|   |── contexts  
|   |── global              # contains react components on each page
|   |── hooks               # hooks used for login and trade transaction
|   └── scenes 
|         |── dashboard     # contains react components of pages
|         |── login          
|         └── register
└── app.js                  # contains the logic to fetch all items and call all the react components.

---

## Instructions to run the project:
1. Open the project in visual studio code  
2. Run `"npm start"` in the backend folder to start the backend API service.
3. Run `"npm start"` in the frontend folder.
4. You will be redirected to landing page of the project.

---

## Domain Model

***Result Screenshots***  

**Landing Page**  
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/efd01ff2-924e-4672-b776-593bd4ebfee0" />

**Choose Client**  
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/21d4c3eb-38de-43eb-bcba-18e2d99c793b" />

**Dashboard**
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/7a90db90-73bb-416b-8618-daee6704c07e" />

**User Holdings**  
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/c4eb32d1-10b9-428e-a86b-826814823b79" />
