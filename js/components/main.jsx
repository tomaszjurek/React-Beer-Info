import React from 'react';
import {Row, Col, Card, CardTitle, Preloader, Button} from "react-materialize";

class Main extends React.Component {
  render() {
  return this.props.isData ? (
    <Row className="container">
      {
        this.props.datas.map((element,index) => {
          return (
            <Col key={element.id} l={3} m={4} s={12}>
              <Card className="medium beer" actions={[<Button key={element.id} waves="light"
                onClick={() => this.props.openModal(element.name, element.tagline, element.image_url, element.description, element.brewers_tips, element.ibu, element.abv)} ><strong>More details</strong></Button>]}>
                <div className="beer-image responsive-img" style={{backgroundImage: `url(${element.image_url})`}}></div>
                <p><strong>{element.name}</strong></p>
                <p>{element.tagline}</p>
              </Card>
            </Col>
          )
        })
      }
    </Row>
  ) : ( this.props.isMoreData && (
    <Row className="container">
      <Col l={12} m={12} s={12}>
        <Preloader className="loader" size='big' color='yellow'/>
      </Col>
    </Row>
    )
  )
}
}

export default Main;
