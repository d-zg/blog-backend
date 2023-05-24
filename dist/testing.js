"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
// testing post request 
// what what 
Promise.resolve().then(() => __importStar(require('node-fetch'))).then(({ default: fetch }) => {
    const url = "http://localhost:3002/blogposts"; // Replace with your API endpoint URL
    const data = {
        // Replace with the data you want to send in the request body
        tagline: "Sample tagline",
        headline: "Sample Headline",
        image: "sample.jpg",
        fulltext: "This is the full text of the blog post."
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Adjust the content type if necessary
        },
        body: JSON.stringify(data)
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
        // Handle the response data
        console.log(data);
    })
        .catch(error => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
    });
});
