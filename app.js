console.log("test");

const messageTypes = { LEFT: "left", RIGHT: "right", LOGIN: "login" };

//Chat stuff
const chatWindow = document.getElementById("chat");
const messageList = document.getElementById("messageList");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

//login stuff
let username = "";
const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const loginWindow = document.getElementById("login");

//array of message objects - {author,date,content, type}
const messages = [
  /*
  {
    author: "test author right",
    date: "1/1/2021",
    content: "message test",
    type: messageTypes.RIGHT
  },
  {
    author: "test author left",
    date: "1/1/2022",
    content: "message test",
    type: messageTypes.LEFT
  },
  {
    author: "test author login",
    date: "1/1/2021",
    type: messageTypes.LOGIN
  }
  */
];

//take in message object and return corresponding message HTML
const createMessageHTML = (message) => {
  console.log(message.type);
  if (message.type === messageTypes.LOGIN) {
    return `<p>${message.author} has joined the chat</p>`;
  }

  return `
  <div class='message ${
    message.type === messageTypes.LEFT ? "message-left" : "message-right"
  }'>
  
  <div id="message-details">
    <p class="message-author">${
      message.type === messageTypes.RIGHT ? "" : message.author
    }</p>
    <p class="message-date">${message.date}</p>
    <p class="message-content">
    ${message.content}
    </p>
  </div>
</div>
`;
};

//function to display all the messages in the array

const displayMessages = () => {
  const messagesHTML = messages
    .map((message) => createMessageHTML(message))
    .join("");
  messageList.innerHTML = messagesHTML;
};
//use map function to iterate the messages array
// pass in each message to the createMessageHTML
//return the HTML string for each message into a new array
//use join to join all the returned html strings
//then display the concatenated html string back onto the DOM

//call display messages
//displayMessages();

//send btn callback - send message and add to array

//login btn callback - log user in, hider login form
loginBtn.addEventListener("click", (e) => {
  //preventdefault of a form
  //browser does not reload the page (default)
  e.preventDefault();

  if (!usernameInput.value) {
    return console.log("must supply a username");
  }
  //set username and create logged in message
  username = usernameInput.value;
  console.log(username);

  messages.push({
    author: username,
    type: messageTypes.LOGIN
  });

  //hide login and show chat window
  loginWindow.classList.add("hidden");
  chatWindow.classList.remove("hidden");

  //display messages
  displayMessages();
});

//send btn
sendBtn.addEventListener("click", (e) => {
  //preventdefault of a form
  //browser does not reload the page (default)
  e.preventDefault();

  if (!messageInput.value) {
    return console.log("must supply a message");
  }

  //set username and create logged in message
  const message = {
    author: username,
    date: new Date(),
    content: messageInput.value,
    type: messageTypes.RIGHT
  };
  messages.push(message);
  displayMessages();
  messageInput.value = "";
  //console.log(message);

  //SCROLL TO THE BOTTOM
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
