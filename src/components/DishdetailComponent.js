import React , { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || val.length<=len;
const minLength = (len) => (val) => val && val.length>=len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this) /*binding toggleModal to this*/
        this.handleSubmit = this.handleSubmit.bind(this) /*binding handleLogin to this*/
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        alert("Current State is : " + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={{ size:12 }}>
                                    <Label htmlFor="rating">Rating </Label>
                                </Col>
                                <Col md={ { size:12  } }>
                                    <Control.select model=".rating" name="rating"
                                           className="form-control"
                                           >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name </Label>
                                </Col>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" 
                                           placeholder="Your Name"
                                           className="form-control"
                                           validators={{
                                               required, minLength: minLength(3), maxLength: maxLength(15)
                                           }} 
                                           />
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment </Label>
                                </Col>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                           rows="6" 
                                           className="form-control"
                                           /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderComments({comments, addComment, dishId}) {


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
            <div>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
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
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />                
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