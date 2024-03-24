import WAWebJS from "whatsapp-web.js";
import axios from "axios";
import { Send } from "../util/reply";
import { Helper } from "../util/helper"; // Assuming Helper provides getMsgFromBody

const process = async (message: WAWebJS.Message, _client: WAWebJS.Client, options: WAWebJS.MessageSendOptions) => {
    console.log("DNS Lookup")
    const error = "Something went wrong, please try again later";
    try {
        const exp = await Helper.getMsgFromBody(message);
        if (!exp) return Send.catch(message, "Please provide a domain");

        const apiKey = 'yJyIBMOwC6qDBO43JuvwOA==sa3xMeZnqFIT2slN'; // Replace with your actual API key

        const dnsResponse = await axios.get(`https://api.api-ninjas.com/v1/dnslookup?domain=${exp}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        // Format the DNS lookup result as plain text
        let resultText = `DNS Lookup Result for ${exp}:\n`;
        const dnsData = dnsResponse.data;

        for (const recordType in dnsData) {
            if (Object.prototype.hasOwnProperty.call(dnsData, recordType)) {
                const records = dnsData[recordType];
                resultText += `${recordType.toUpperCase()} Records:\n`;

                // Check if records is an array
                if (Array.isArray(records)) {
                    records.forEach((record: any) => {
                        resultText += `${record}\n`;
                    });
                } else if (typeof records === 'object') { // Check if records is an object
                    // Iterate over the object properties and format them
                    for (const property in records) {
                        if (Object.prototype.hasOwnProperty.call(records, property)) {
                            resultText += `${property}: ${records[property]}\n`;
                        }
                    }
                } else {
                    resultText += `${records}\n`; // If neither array nor object, treat as a single record
                }

                resultText += '\n';
            }
        }

        Send.text(message, options, resultText);
    } catch (error) {
        console.error("Error:", error);
        Send.catch(message, error);
    }
};

module.exports = {
    name: "dns",
    process
};
