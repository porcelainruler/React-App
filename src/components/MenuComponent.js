import React , { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish : null
        }
    }

    onDishSelect(dish){
        this.setState({ selectedDish : dish });
    }

    renderDish(dish) {
        if(dish !=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>                        
                        </CardBody>    
                    </Card>
                </div>    
            );
        }
        else{
            return(
                <div></div>
            );
        }
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
                    <div>
                        <p>
                            {text.comment}
                        </p>
                        <p>
                           -- {text.author} , {month[parseInt(date[1])-1]} {date[0]}, {date[2]}
                        </p>
                    </div>
                );
            });

            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>
                        Comment
                    </h4>
                    {comment}
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

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
            
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
            
                        <CardImgOverlay>
                            <CardTitle> {dish.name} </CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    { menu }
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                    {this.renderComment(this.props.dishes[0])}
                </div>
            </div>
        );
    }

}

export default Menu;