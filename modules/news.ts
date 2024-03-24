import WAWebJS from "whatsapp-web.js";
import { Send } from "../util/reply"; 
import { Helper } from "../util/helper";

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('YOUR_API_KEY');

const process = async (message: WAWebJS.Message, _client: WAWebJS.Client, options: WAWebJS.MessageSendOptions) => {
    console.log("News");
    const error = "Something went wrong, please try again later";
    try {
        // Extract user input from the message
        const userInput = await Helper.getMsgFromBody(message);

        // If no user input provided, return error message
        if (!userInput) return Send.catch(message, "Please provide a query term");

        // Split the user input into individual query parameters
        const queryParameters = userInput.split(',');

        // Construct the options object for the NewsAPI request
        const newsApiOptions: any = {};
        queryParameters.forEach(param => {
            const [key, value] = param.split(':').map(item => item.trim());
            newsApiOptions[key] = value;
        });

        // Make the NewsAPI request with the constructed options
        const response = await newsapi.v2.topHeadlines(newsApiOptions);

        // Check if there are any articles in the response
        if (response.articles.length > 0) {
            // Format the headlines
            let headlines = "Top Headlines:\n\n";
            response.articles.forEach((article: any, index: number) => {
                headlines += `${index + 1}. ${article.title}\n${article.url}\n\n`;
            });

            // Send the headlines as a message
            Send.text(message, options, headlines);
        } else {
            Send.catch(message, "No headlines found for the query: " + userInput);
        }
    } catch (error) {
        Send.catch(message, "An error occurred: " + error);
    }
};

module.exports = {
    name: "news",
    process
};
