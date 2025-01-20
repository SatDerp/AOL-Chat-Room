
const userName = document.getElementById('username');
const chatList = document.getElementById('chatbox-list');
const msg = document.getElementById('text21');
const submitBtn = document.getElementById('enter-msg');
const listOfPeople = document.getElementById('list-ppl-userlist');
const fontOptions = document.getElementById('font-option');


let userLogs = {
    name: '',
    message: '',
    font: null
};

let options = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: ''
};

fontOptions.addEventListener("change", () => {
    if (fontOptions.selectedIndex == 0) {
        userLogs.font = "times";
        msg.classList.add("times");
        msg.classList.remove("courier");
    } else {
        userLogs.font = "courier";
        msg.classList.add("courier");
        msg.classList.remove("times");
    }
});

userName.addEventListener("change", () => {
    document.getElementById("userNameWindow").style.display = "none";
    document.getElementById("chatroom").style.display = "flex";

    userLogs.name = userName.value;
    addNewMessage("joined the chat room");
});

submitBtn.addEventListener("click", async () => {
    if (msg.value != '') {
        addNewMessage(msg.value)
    }
});

msg.addEventListener("change", async () => {
    addNewMessage(msg.value)
    msg.value = '';
});


async function addNewMessage(addNewMsg) {
    userLogs.message = addNewMsg;
    options.body = JSON.stringify(userLogs);

    try {
        //response is a readablestrem
        //.json consumes the stream and converts to a text string
        // then text string is JSON.parse() on it
        //await once for fetch to resolve promise into a response obj
        //await the parsing of response which happens async
        let response = await fetch(options.method, options);
        const serverLogs = await response.json();
        const browserLogs = [...serverLogs.chatLogs];
        const pplList = [...serverLogs.people];

        chatList.textContent = '';
        browserLogs.forEach((newMsg) => {
            const listElement = document.createElement('li');
            //add css style for text stylling 
            listElement.textContent = `${newMsg.name}: ${newMsg.message}`;
            if (newMsg.font != null)
                listElement.classList.add(newMsg.font);
            chatList.appendChild(listElement);
        });

        listOfPeople.textContent = '';
        pplList.forEach((names) => {
            const listElement = document.createElement('li');
            listElement.textContent = names;
            listOfPeople.appendChild(listElement);
        });
    } catch (e) {
        console.log("error: ", e);
    }
}

async function pingServer() {
    try {
        let response = await fetch("ping");
        const serverLogs = await response.json();
        const browserLogs = [...serverLogs.chatLogs];
        const pplList = [...serverLogs.people];

        chatList.textContent = '';
        browserLogs.forEach((newMsg) => {
            const listElement = document.createElement('li');
            //add css style for text stylling 
            listElement.textContent = `${newMsg.name}: ${newMsg.message}`;
            if (newMsg.font != null)
                listElement.classList.add(newMsg.font);
            chatList.appendChild(listElement);
        });

        listOfPeople.textContent = '';
        pplList.forEach((names) => {
            const listElement = document.createElement('li');
            listElement.textContent = names;
            listOfPeople.appendChild(listElement);
        });
    } catch (e) {
        console.log("error: ", e);
    }
}

setInterval(pingServer, 1000);


//make text pretty
//add msg when ppl leave
