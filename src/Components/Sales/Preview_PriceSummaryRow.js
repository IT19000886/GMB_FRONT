import React,{Component} from 'react';



class Preview_PriceSummaryRow extends Component{

    constructor(props){
        super(props);

        this.state={
            summary1:props.summary1,
            summary2:props.summary2,
            summary3:props.summary3,
            summary4:props.summary4
        }

    }

   
    render(){
        return(
            <tr className='text-center'>
                  	<td>{this.state.summary1}</td>
                    <td>{this.state.summary2}</td>
                    <td>{this.state.summary4}</td>
        	</tr>
        )
    }

}

export default Preview_PriceSummaryRow;