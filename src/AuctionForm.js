import React, {Component} from 'react';
import './ActionForm.css';

class AuctionForm extends Component{
    static get ALL(){
        return -1;
    } 
    // static get BLOCK(){
    //     { display: 'block' }
    // } 
    // static get NONE(){
    //     { display: 'none' }
    // } 
    state ={       
        types : [
            {Id: 1 , Name: 'Piano', AuctionDate : '2022-01-01', Src : '/piano.jpg', Sold : false},
            {Id: 2 , Name: 'Guitar', AuctionDate : '2022-02-01', Src : '/guitar.jpg', Sold : false},
            {Id: 3 , Name: 'Saxsophone', AuctionDate : '2022-03-01', Src : '/saxsophone.jpg', Sold : false},
            {Id: 4 , Name: 'Violin', AuctionDate : '2022-04-01', Src : '/violin.jpg', Sold : false},
            {Id: 5 , Name: 'Base', AuctionDate : '2022-05-01', Src : '/baseGuitar.jpg', Sold : false},
            {Id: 6 , Name: 'Chello', AuctionDate : '2022-06-01', Src : '/chelo.jpg', Sold : false},
        ],
        currType: { 
        },      
        currentTypeId : this.constructor.ALL,
        showSubmitMessage : false
    };
    handleSubmit =(e)=>{
        e.preventDefault(); 
        const newState = {
            types : this.state.types.map(type => type.Id === this.state.currentTypeId ?
                {...type, 
                    AuctionDate: this.state.currType.AuctionDate
                   ,Sold : this.state.currType.Sold
                } : type),            
            currType : this.state.currType,
            currentTypeId : this.state.currentTypeId,
            showSubmitMessage : true         
        };
        this.setState(newState,()=>{
            console.log(this.state); 
            alert('Data Persisted!') 
        });      
    };
    handleTypeChanged=(e)=>{
        const newTypeId = parseInt(e.target.value);
        const newState = {
            ...this.state,
            currType : this.state.types.find(type=> type.Id === newTypeId),
            currentTypeId : newTypeId,
            showSubmitMessage : false             
        };
        this.setState(newState,()=>{
            console.log(this.state);  
        }); 
    };
    handleDateChanged=(e)=>{
        const newDate =e.target.value;       
        this.setState(()=> ({
                ...this.state,           
                currType:{
                    ...this.state.currType,
                    AuctionDate : newDate
                },
                currentTypeId : this.state.currentTypeId,
                showSubmitMessage : false                          
        }),()=>{
            console.log(this.state);  
        });    
    };
    handleSoldChanged=(e)=>{
        const newSold =e.target.checked;
        this.setState(()=> ({
            ...this.state,           
            currType:{
                ...this.state.currType,
                Sold : newSold
            },
            currentTypeId : this.state.currentTypeId,
            showSubmitMessage : false                           
    }),()=>{
        console.log(this.state);  
    });   
    };
    componentDidMount=()=>{
        const newTypeId= 1;
        this.setState(prevState => ({
            ...prevState,
            currType : prevState.types.find(type => type.Id === newTypeId),
            currentTypeId : newTypeId,
            showSubmitMessage : false               
        }),()=>{
            console.log(this.state);  
        }); 
        
    }
    
    render(){
        return(
            <div className='formContainer'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='ddlInstrumType'>Instrument Type:</label>
                    <select id='ddlInstrumType' className='ddlInstrumType'
                    onChange={this.handleTypeChanged}>
                        {this.state.types.map((type)=>{
                            return <option key={type.Id} value={type.Id}>{type.Name}</option>
                        })}                  
                    </select>
                    <label htmlFor='txtSaleDate'>Sale Date:</label>
                    <input id='txtSaleDate'
                     type='date'
                     className='txtSaleDate'
                     value={this.state.currentTypeId === this.constructor.ALL? '' :  this.state.currType.AuctionDate}   
                                                  
                     onChange={this.handleDateChanged}>                   
                    </input>
                    <img src={this.state.currType.Src} className='imgSource' alt=''></img> 
                    <span>
                        <label htmlFor='chkSold'>Sold:</label>
                        <input id='chkSold'
                         type='checkbox'
                         className='chkSold'
                         onChange={this.handleSoldChanged}
                         checked={this.state.currentTypeId === this.constructor.ALL ? false :  this.state.currType.Sold }           
                        >                
                        </input>
                    </span> 
                    <button type='submit' className='btnSubmit'>Submit</button>         
                </form>
            </div>
        );
    }
    
}
export default AuctionForm;
