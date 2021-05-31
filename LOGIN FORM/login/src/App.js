import React, { Component } from 'react';
import './App.css';

function MessageBox (props) {
  if (props.messageBox === 1) {
    return (
      <div className="messageBox">{props.errorMessage}</div>
    )
  } else {
    return (
      <div></div>
    )
  }
  
}
function FirstStepLoginSet (props) {
  
  return (
    <div>
      <form className="form">
        <label>
          Name:
            <input 
              type="text" 
              name="name" 
              value = {props.name} 
              onChange={props.onChangeFormHandler}
            />
        </label>
        <label>
          Phone number:
            <input 
              type="text" 
              name="phone" 
              value = {props.phone} 
              onChange={props.onChangeFormHandler} 
            />
        </label>  
      </form>
      <div className="buttonHolder">
        <div className="sendDataButton" onClick={props.uploadOnClick}>Send</div>
      </div>
    </div>
  ) 
}
function SecondStepLoginSet (props) {
  
  return (
    <div>
      <form className="form">
        <label>
          Email:
            <input 
              type="email" 
              name="email" 
              value = {props.email} 
              onChange={props.onChangeFormHandler}
            />
        </label>
        <label>
          Date of brth:
            <input 
              type="date" 
              name="dob" 
              value = {props.dob} 
              onChange={props.onChangeFormHandler} 
            />
        </label>  
      </form>
      <div className="buttonHolder">
        <div className="sendDataButton" onClick={props.uploadOnClick}>Send</div>
      </div>
    </div>
  ) 
}
function ThirdStepLoginSet (props) {
  
  return (
    <div><br />
      Please confirm below data: <br />
       <hr />
      Name: <b>{props.name} </b><br />
      Phone: <b>{props.phone} </b><br />
      Email: <b>{props.email} </b><br />
      Date of birth: <b>{props.dob} </b>

      <div className="buttonHolder">
        <div className="goBackButton" id="goBackButton" onClick={props.uploadOnClick}>go back</div>
        <div className="sendDataButton" id="confirmButton" onClick={props.uploadOnClick}>confirm</div>

      </div>
    </div>
  ) 
}
function FourthStepLoginSet (props) {
  
  return (
    <div><br />
      You have been succesfully registered! 
    </div>
  ) 
}
function LoginContainer (props) {
    let divStyle1 = props.currentStep > 1 ? "stepsActive" : "steps"
    let divStyle2 = props.currentStep > 2 ? "stepsActive" : "steps"
    let divStyle3 = props.currentStep > 3 ? "stepsActive" : "steps"
    let divStyle4 = props.currentStep > 4 ? "stepsActive" : "steps"
  return (
    <div>
      <div className="loginContainer">
        <div className="stepsBar">
          <div className={divStyle1}>step 1</div>
          <div className={divStyle2}>step 2</div>
          <div className={divStyle3}>step 3</div>
          <div className={divStyle4}>step 4</div>
        </div>
        <div className="forms" id="formFirstStep">

          {props.currentStep === 1 ? 
            <FirstStepLoginSet 
              uploadOnClick = {props.uploadOnClick}
              onChangeFormHandler = {props.onChangeFormHandler}
              name = {props.name}
              phone = {props.phone}
            
            /> : 
            
            props.currentStep === 2 ? 
            <SecondStepLoginSet 
              uploadOnClick = {props.uploadOnClick}
              onChangeFormHandler = {props.onChangeFormHandler}
              name = {props.name}
              phone = {props.phone}
            
            /> : 
            
            props.currentStep === 3 ? 
            <ThirdStepLoginSet 
              name = {props.name}
              phone = {props.phone}
              email = {props.email}
              dob = {props.dob}
              uploadOnClick = {props.uploadOnClick}
            
            /> : <div></div>}
        </div>
      </div>
      <MessageBox 
        errorMessage = {props.errorMessage}
        messageBox = {props.messageBox}
      />
    </div>
  )
  
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      name: "", 
      phone: "", 
      email: "", 
      dob: null, 
      emailError: "",
      ageError: null,
      nameError: null, 
      phoneError: null,
      dobError: "",
      dobChecked: false,
      errorMessage: [],
      messageBox: null,
      secondStep: null
    }
  }

  fetchPostData = () => {
    const newUserData = {
      name: this.state.name, 
      phone: this.state.phone, 
      email: this.state.email, 
      dob: this.state.dob
    }
    console.log(newUserData)
    const requestOptions = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, body: JSON.stringify(newUserData)
    }

    fetch('http://localhost:4000/newUser', requestOptions)
      .then(response => response.json())
      .then((body) => {
        console.log(body)
      })
      .catch((error) => {
        alert("ups, something went wrong. Please try again (Backend not set up as not required)")
      })

  }
  dobValidator = () => {
    var ageDiffrencies = Date.now() - new Date(this.state.dob)
    var ageDate = new Date(ageDiffrencies); // miliseconds from epoch
    var final = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (final >= 18) {
      this.setState({
        dobChecked: true
      })
    } else {
      this.setState({
        ageError: "Please note our service is for over 18 years old people only"
      })
    }
  }
  firstStepValidator = () => {
    let nameFormat = /^[a-zA-Z]+$/; 
    let phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  
    {/*name validation */}
    if (
      !this.state.name.match(nameFormat) ||
      this.state.name.length > 10 ||
      this.state.name.length < 1
      ) {
        this.setState({
          messageBox: 1, 
          nameError: "Incorrect name format, name has to have between 1-10 characters without use of special characters; "

        })
    } else {
      this.setState({ 
        nameError: null
      })
    }

    {/*phone validation */}
    if (
      !this.state.phone.match(phoneFormat)
      ) {
        this.setState({
          messageBox: 1, 
          phoneError:"Incorrect phone format, please use i.e.: +31636363634; "
          
        })
    } else {
      this.setState({
        phoneError: null
      })
    }

    setTimeout(() => {
      if (
        this.state.nameError === null 
        && this.state.phoneError === null
        
        ) {
          this.setState({
            currentStep: 2,
            messageBox: null, 
            emailError: "", 
            dobError: ""
          })
        } else {
          this.setState({
            errorMessage: [this.state.nameError, this.state.phoneError]
          })
        }
      }, 100)
    
  }
  secondStepValidator = () => {
   
    {/** email validation */}
      if (this.state.emailError !== null) {
        this.setState({
          emailError: "Please provide correct email; ", 
          messageBox: 1
        })
      }

      {/** DOB validation */}      
      if (this.state.dobError !== null) {
        this.setState({
          dobError: "Please provide correct date of birth; ", 
          messageBox: 1
        })
      } else {
        this.setState({
          dobError: null
        })
      }

      this.dobValidator();

      setTimeout(() => {
        if (
          this.state.emailError === null 
          && this.state.dobChecked === true
          ) {
            this.setState({
              currentStep: 3,
              messageBox: null, 
            })
          } else {
            this.setState({
              errorMessage: [this.state.emailError, this.state.dobError, this.state.ageError], 
            })
          }
        }, 100)
  }
  uploadFormDataHandler = (e) => {
    if (this.state.currentStep === 1) {
      this.firstStepValidator()
    } else if (this.state.currentStep === 2) {
      this.secondStepValidator()
    } else if (this.state.currentStep === 3) {
      if (e.target.id === "confirmButton") {
        this.fetchPostData();
        this.setState({
          currentStep: 4
        })
      } else if (e.target.id === "goBackButton") {
        this.setState({
          currentStep: 1
        })
      }
    }

  }
  onChangeFormHandler = (e) => {
      if (e.target.name === "email" && !e.target.validity) {
        this.setState({
          messageBox: 1,
          emailError: "please enter valid email"
        })
      } else {
        this.setState({
          emailError: null
        })
      }
      this.setState({
        [e.target.name]: e.target.value
      })
  }
  render () {
    return (
      <div className="appBox">
        <LoginContainer 
          uploadOnClick = {this.uploadFormDataHandler}
          onChangeFormHandler = {this.onChangeFormHandler}
          name = {this.state.name}
          phone = {this.state.phone}
          email = {this.state.email}
          dob = {this.state.dob}
          messageBox = {this.state.messageBox}
          errorMessage = {this.state.errorMessage}
          currentStep = {this.state.currentStep}
          
        />
        
      </div>
      
    )
  }
}

export default App;
