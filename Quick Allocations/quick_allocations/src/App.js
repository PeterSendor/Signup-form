import React from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class SortButton extends React.Component {
    render () {
      if (this.props.sortOrder === "asc") {
        return (
          <button 
            id={this.props.id}
            className='sortButton-desc' 
            onClick={this.props.onClick}>▼
            
          </button>
          
        )
      } else if (this.props.sortOrder === "desc") {
        return (
          <button 
            id={this.props.id}
            className='sortButton-desc' 
            onClick={this.props.onClick}>▲
            
          </button>
          
        )
      }
      
    }
}
class QAButton extends React.Component {
  render () {
      const buttonClass = this.props.buttonClass; 
      

      return (
          <button 
          className={buttonClass} 
          onClick={this.props.onClick}>
          QA
          </button>
      )
          
  }
}
class AllocateButton extends React.Component {
  
  render () { 
      const onClick = this.props.onClick;
      const AllocationsButtonState = this.props.AllocationsButtonState;

      if (AllocationsButtonState === false) {
        return (
          <button 
          className="allocateButtonNotActive"
          >
          
          Allocate Selection
          </button>
        )
      } else if (AllocationsButtonState === true) {
        return (
          <button 
          className="allocateButtonActive"
          onClick={onClick}>
          Allocate Selection
          </button>
      )
      }

      
          
  }
}
class CommentSection extends React.Component {
  render () {
      const comment = this.props.comment === "true" ? "Now you can see only Piotr Sendor's cases - just click ALLOCATE BUTTON to assign these cases to that particular user" : "All daily orders are presented in the table. Please click the glowing QA (Quick Allocations) button to see how this feature will work" ;

      return (
          <div className="commentSection">  
            {comment}
          </div>
      )
          
  }
}

//Panel Section start
class PanelTop extends React.Component {
  render () {
      
      return (
          <div className="topPanel">
           
          </div>
      )
          
  }
}
class PanelLeft extends React.Component {
    render () {
        
        return (
            <div className="leftPanel">
             
            </div>
        )
            
    }
}
class MiddleTop extends React.Component {
    render () {
      const commentToSend = this.props.commentValue;
      const buttonClass = this.props.class;

        return (
            <div>
              <div className="middleTopPanel">
              <QAButton 
                    onClick={() => this.props.onClick()}
                    buttonClass={buttonClass}
                  />
              </div>
                <div className="commentSection">
                  <CommentSection 
                    comment={commentToSend}/>
                </div>
                
            </div>  
              
            
            
 

        )
            
    }
}
class AllocationsTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleSortClick = this.handleSortClick.bind(this);
    

    this.state = {
      sortCategory: null,
      sortOrder: "asc"

    };
  }

  handleSortClick (e) {
    const sortOrder = this.state.sortOrder;

    this.setState({
      sortCategory: e.target.id,
      sortOrder: sortOrder === "asc" ? "desc": "asc"
      });

  }


  render () {
    const sortCategory = this.state.sortCategory;
    const sortOrder = this.state.sortOrder;
    const initialData = Array.from(this.props.initialData);
    const AllocationsButtonState = this.props.AllocationsButtonState

    initialData.sort((a,b) => {
      if ( a[sortCategory] < b[sortCategory] ){
        return sortOrder === "asc" ? -1: 1; 
      }
      if ( a[sortCategory] > b[sortCategory] ){
        return sortOrder === "asc" ? 1: -1; 
      }
      return 0;
    })
    
    const HKTable = initialData.map((element, index) => {

      const tdClass = 
        (element.company === "Super company" && element.checkLocation !== "UK")
        || 
        (element.company === "MorganStanley" && element.checkLocation !== "UK")
? 'tdClass': null;      

      return ( 
        <tr>
          <td className={tdClass}>
            {element.company}
          </td>
          <td className={tdClass}>
            {element.product}
          </td>
          <td className={tdClass}>
            {element.checkLocation}
          </td>
          <td className={tdClass}>
            {element.orderDate}
          </td>
          <td className={tdClass}>
            {element.assignedTo}
          </td>
        </tr>
      )
  })


    return(
      <div>
      <table className="allocationsTable">
      <tbody>
        <tr>
          <th key='0'>Company  
            <SortButton
              onClick={this.handleSortClick} 
              id={"company"}
              sortOrder={this.state.sortOrder}
            />
          </th>
          <th key='1'>Product name  
            <SortButton
              onClick={this.handleSortClick} 
              id={"product"}
              sortOrder={this.state.sortOrder}
            />
          </th>
          <th key='2'>Location  
            <SortButton
              onClick={this.handleSortClick} 
              id={"checkLocation"}
              sortOrder={this.state.sortOrder}
            />
          </th>
          <th key='3'>Order date  
            <SortButton
              onClick={this.handleSortClick} 
              id={"orderDate"}
              sortOrder={this.state.sortOrder}
            />
          </th>
          <th key='4'>Assigned to  
            <SortButton
              onClick={this.handleSortClick} 
              id={"assignedTo"}
              sortOrder={this.state.sortOrder}
            />
          </th>
        </tr>
          {HKTable}

          </tbody>
      </table>
      <AllocateButton 
        AllocationsButtonState={AllocationsButtonState}
        onClick={() => this.props.onClick()} 
      />
      </div>
      
      
    )
  }
}
class MiddleBottom extends React.Component {
  render () {
    const initialData = this.props.initialData; 
    const AllocationsButtonState = this.props.AllocationsButtonState;
      return (
          <div className="middleBottomPanel">
          <AllocationsTable 
            initialData={initialData}
            AllocationsButtonState={AllocationsButtonState}
            onClick={this.props.onClick} 

          />  
          </div>
      )
          
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleAlocationsButton = this.handleAlocationsButton.bind(this);
    this.callApi = this.callApi.bind(this);
    

    this.state = {
      showAssignedOnly: false, 
      buttonClass: "qaButtonAnimated",
      apiResponse:"miod", 
      

    };
  }

  callApi = () => {
    fetch("https://localhost:4000/inputAllocations")
    .then (
      fetch("https://localhost:4000")
      .then(res => res.json())
      .then(data => this.setState({apiResponse: data["data"]}))
      .then(res => console.log(res))
    )
   
      
  }
  callApiNotRefresh = () => {
    fetch("https://localhost:4000")
      .then(res => res.json())
      .then(data => this.setState({apiResponse: data["data"]}))
      .then(res => console.log(res))
      
  }
  componentDidMount() {
    this.callApi()
      
  }
  assignment() {
    fetch("https://localhost:4000/assign")
      .then(res => res.json())
      .then(data => this.setState({apiResponse: data["data"]}))
      .then(res => console.log(res))
      
  }
  allocate = () => {
    fetch("http://localhost:4000/allocate")
      .then(res => res.json())
      .then(res => alert(res.data.affectedRows + " new subrequests have been assigned to Piotr Sendor"))
      .then(this.callApiNotRefresh)
      
      
  }

  handleAlocationsButton () {
    this.state.showAssignedOnly === true ? this.callApi() : this.assignment();


    this.state.showAssignedOnly === true ? 
    (this.setState({
      showAssignedOnly: false,
      buttonClass: "qaButtonAnimated"
    })) : (this.setState({
      showAssignedOnly: true,
      buttonClass: "qaButtonStatic"
    }))
  }

  render() {
    const state = this.state.showAssignedOnly;
    const stateString = state.toString();
    const buttonClass = this.state.buttonClass; 
    const initialData = this.state.apiResponse;

    return (
      
        <div className="containerBox">
          <PanelTop />
            <div className="mainContainer">
              <PanelLeft />
                <div className="middleContainer">
                  <MiddleTop 
                    commentValue={stateString}
                    onClick={this.handleAlocationsButton} 
                    class={buttonClass}
                  />
                  <MiddleBottom 
                    initialData={initialData}
                    AllocationsButtonState={state}
                    onClick={this.allocate} 
                  />
                </div>
              
            </div>  
            
        </div>     
        
    );
  }
}  
