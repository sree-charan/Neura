import WAWebJS from "whatsapp-web.js";
import { Send } from "../util/reply";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import GoogleGenerativeAI from Google Gemini API package
import { Helper } from "../util/helper";


const process = async (message: WAWebJS.Message, _client: WAWebJS.Client, options: WAWebJS.MessageSendOptions) => {
    console.log("chatGPT");
    // Ensure you have your Google API key set up as an environment variable
    const apiKey = "YOUR_API_KEY";

    if (!apiKey) return Send.catch(message, "API key is missing. Please set up your API key.");

    const genAI = new GoogleGenerativeAI(apiKey);
    const msg = await Helper.getMsgFromBody(message);

    if (!msg) return Send.catch(message, "What do you want to ask?");

    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(msg);
        const response = await result.response;
        const text = response.text();

        if (!text) return Send.catch(message, "AI model didn't respond. Give it another try :)");

        return Send.text(message, options, text.trim());
    } catch (error) {
        console.error("Error:", error);
        return Send.catch(message, "Uh oh! I ran into some trouble. Give it another try");
    }
};

module.exports = {
    name: "q",
    process
};
