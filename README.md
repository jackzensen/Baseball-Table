# MLB Team Website

This self-hosted webpage allows for one to view current MLB teams, sort and filter them by their league and division, and more view more information regarding individual teams and players.


## Requirements

Node.js v14.16.1

react 17.0.2



### How to use 


API Key


Before you're able to use the application, you must set your own api key. This can be done by modifying the "SAMPLEENV.txt" file located within the frontend folder. Change the parameter REACT_APP_API_KEY to match your own API key, and then rename the file to ".env"

To use this application, first `cd frontend` and run `npm install` to install dependencies. `npm start` will allow you to view the webpage at localhost:3000.


Table


Columns in a table can be filtered by hovering over the column name and opening the kebab menu. Select filter, and enter the value you desire to filter by. You can also use the kebab menu to sort values or hide columns

To see a team's lineup, double click the row it is located on in the table. You can also double click a player's row to view more information about them. Click the "Back to teams" button to be brought to the table showing teams