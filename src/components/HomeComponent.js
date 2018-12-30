import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components'

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return (
      <Loading />
    );
  } else if (errMess) {
    return (
      <h3>
        <strong>{errMess}</strong>
      </h3>
    )
  } else {
    return (
      <FadeTransform in transformProps={{
        exitTransform: 'scale(0.5) translate(-50%)'
      }}>
      <Card>
        <CardImg src={baseUrl + item.image} alt={item.name} />
        <CardBody>
            <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
            <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
    );
  }
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-2">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess} />
        </div>
        <div className="col-12 col-md m-2">
          <RenderCard 
            item={props.promotion} 
            isLoading={props.promoLoading} 
            errMess={props.promoErrMess} />
        </div>
        <div className="col-12 col-md m-2">
          <RenderCard 
          item={props.leader} 
          isLoading={props.leaderLoading}
          errMess={props.leaderErrMess}/>
        </div>
      </div>
    </div>
  );
}

export default Home;