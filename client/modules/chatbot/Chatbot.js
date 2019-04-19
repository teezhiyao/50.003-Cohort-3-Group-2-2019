import React, { Component } from "react";
import axios from "axios/index";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import Message from "./Message";
// import 'materialize-css/dist/css/materialize.min.css';
import Card from "./Card";
import QuickReplies from "./QuickReplies";
import callApi from "../../util/apiCaller";

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  talkInput;
  constructor(props) {
    super(props);

    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this.state = {
      messages: [],
      showBot: true
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
  }
  df_text_query(queryText) {
    let msg;
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: queryText
        }
      }
    };
    // return callApi("postNewPost", "post", {

    const res = callApi("api/df_text_query", "post", {
      text: queryText,
      userID: cookies.get("userID")
    });
    console.log("In Df text");
    console.log(res);
    // this.setState({ messages: ["What is this. lol2"] });

    // const res = axios.post("/api/df_text_query", {
    //   text: queryText,
    //   userID: cookies.get("userID")
    // });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: "bot",
        msg: msg
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }
  df_event_query(eventName) {
    // const res = axios.post("/api/df_event_query", {
    //   event: eventName,
    //   userID: cookies.get("userID")
    // });
    const res = dispatch =>
      callApi("api/df_event_query", "post", {
        event: eventName,
        userID: cookies.get("userID")
      }).then(res => res);
    console.log("In Df event");
    console.log(res);
    // this.setState({ messages: ["What is this. lol"] });
    // for (let msg of res.data.fulfillmentMessages) {
    //   let says = {
    //     speaks: "me",
    //     msg: msg
    //   };
    //   this.setState({ messages: [...this.state.messages, says] });
    // }
  }

  componentDidMount() {
    this.df_event_query("Welcome");
  }
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }
  show(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: true });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: false });
  }

  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    switch (payload) {
      case "training_masterclass":
        this.df_event_query("MASTERCLASS");
      default:
        this.df_text_query(text);
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.cards
    ) {
      return (
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                <a className="btn-floating btn-large waves-effect waves-light red">
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      270
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  _handleInputKeyPress(e) {
    if (e.key == "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        <div
          style={{
            height: 400,
            width: 500,
            position: "absolute",
            bottom: 0,
            right: 0,
            border: "1px solid lightgrey"
          }}
        >
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">ChatBot</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.hide}>
                    Close
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div
            id="chatbot"
            style={{ height: 388, width: "100%", overflow: "auto" }}
          >
            {this.renderMessages(this.state.messages)}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>
          <div className=" col s12">
            <input
              style={{
                margin: 0,
                paddingLeft: "1%",
                paddingRight: "1%",
                width: "98%"
              }}
              ref={input => {
                this.talkInput = input;
              }}
              placeholder="type a message:"
              onKeyPress={this._handleInputKeyPress}
              id="user_says"
              type="text"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: 40,
            width: 500,
            position: "absolute",
            bottom: 0,
            right: 0,
            border: "1px solid lightgrey"
          }}
        >
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">ChatBot</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.show}>
                    Open
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            ref={el => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", claer: "both" }}
          />
        </div>
      );
    }
  }
}
export default Chatbot;