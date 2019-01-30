import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';



class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

    handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        let content = event.target.value;
        document.getElementsByName(event.target.name)[0].value=''
        let username = this.state.currentUser.name
        const newMessage = {'type': "postMessage", 'username': username, 'content': content};
        this.socket.send(JSON.stringify(newMessage))

      }
    }

    changeUserName = (event) => {
      if(event.key == 'Enter'){
        let oldUserName = this.state.currentUser.name;
        let newUserName = event.target.value;
        this.state.currentUser.name = newUserName;
        let content = oldUserName+" changed their name to "+newUserName;
        let newMessage = {'type': 'postNotification', 'content': content};
        this.socket.send(JSON.stringify(newMessage))
      }
    }


  componentDidMount() {
    let mySocket = new WebSocket("ws://localhost:3001/");
    this.socket = mySocket;
    mySocket.onopen = () => {
      if(mySocket.readyState) {
        console.log('Connected to server');
      }
    }

    mySocket.onmessage = (message) => {
      let data = JSON.parse(message.data)
      if (data.clients) {
        this.setState({users: data.clients})
      }
      else {
        const messages = this.state.messages.concat(data)
        this.setState({messages: messages})
        window.scrollTo(0,document.querySelector(".messages").scrollHeight);
      }
    }
  }



  render() {

    return (

      <div>
        <NavBar users={this.state.users}/>

        <MessageList messages={this.state.messages}/>

        <ChatBar defaultUser={this.state.currentUser.name} onKeyPress={this.handleKeyPress} changeUserName={this.changeUserName}/>
      </div>
    );
  }
}
export default App;
