// testing post request 
// what what 
import('node-fetch').then(({ default: fetch }) => {
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