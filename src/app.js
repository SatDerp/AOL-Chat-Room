
let browserLogs = [];
const userName = document.getElementById('username');

userName.addEventListener("change", () => {
    document.getElementById("userNameWindow").style.display = "none";
    document.getElementById("chatroom").style.display = "flex";

    const userLogs = {
        name: userName.value,
        message: `${userName.value} joined the chat room`
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogs)
    };

    fetch("firstUser", options).then(() => {
        browserLogs.push(`${userLogs.name}: ${userLogs.message}`);
        console.log(browserLogs)
    });
});


//add function for when the text box is submitted
//this means new message to add to array so fetch the server
//give new JSOn with same body format
//JSON will be processed by server and server will add to their own array
//array will be sent back and compare two arrays
//any overlap will cause chatbox to adjust
//catch server array back to date


//use timeout func to ping server every few secs
//use a GET call
//