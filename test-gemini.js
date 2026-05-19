const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyAMs4e78wUglbX-Z7la2C6PJPyWwNDcokY";

async function test() {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello!");
        const response = await result.response;
        console.log("Success:", response.text());
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
        }
    }
}

test();
