import React , { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props){
        super(props);
    }

    renderComment(dish) {

        if(dish!=null){
            const month =["Jan" , "Feb" , "Mar" 
                        , "Apr" , "May" , "Jun" 
                        , "Jul" , "Aug" , "Sep" 
                        , "Oct" , "Nov" , "Dec"]
        
            const comment = dish.comments.map((text) => {
                const date = text.date.split('T')[0].split("-").reverse().join("-").split("-");
                return(
                    <li>
                        <p>
                            {text.comment}
                        </p>
                        <p>
                           -- {text.author} , {month[parseInt(date[1])-1]} {date[0]}, {date[2]}
                        </p>
                    </li>
                );
            });

            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>
                        Comment
                    </h4>
                    <ul className='list-unstyled'>
                        {comment}
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    render(){
        if(this.props.dish !=null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle> {this.props.dish.name} </CardTitle>
                                <CardText> {this.props.dish.description} </CardText>                        
                            </CardBody>    
                        </Card>
                    </div>
                    { this.renderComment(this.props.dish) }
                </div>    
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
}

export default DishDetail;