import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComment({ comments }) {


    const month = ["Jan", "Feb", "Mar"
        , "Apr", "May", "Jun"
        , "Jul", "Aug", "Sep"
        , "Oct", "Nov", "Dec"]

    const comment = comments.map((text) => {
        const date = text.date.split('T')[0].split("-").reverse().join("-").split("-");
        return (
            <li>
                <p>
                    {text.comment}
                </p>
                <p>
                    -- {text.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(text.date)))} , {/*month[parseInt(date[1])-1]} {date[0]}, {date[2]*/}
                </p>
            </li>
        );
    });

    return (
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

function RenderDish({ dish }) {
    if (dish != null) {
        return (
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
    else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComment comments={props.comments} />
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


export default DishDetail;