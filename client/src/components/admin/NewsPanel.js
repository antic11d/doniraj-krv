import React, {Component} from 'react';
import {Accordion, Card, Button, Nav, Tab, Row, Form } from "react-bootstrap";
import axios from 'axios';

const fakeNews = [
    {
        title: 'News Title #1',
        description: 'SVI CE IZGINEMO',
        date: '24.5.2012'
    },
    {
        title: 'News Title #2',
        description: 'SVI CE IZGINEMO',
        date: '26.07.1984'}
];

class NewsPanel extends Component{



    constructor(props) {
        super(props);
        this.state = {
            news: [],
            status: 'Create new',
            send: 'Submit'
        }

        this.myRef = React.createRef();

        this.renderNews = this.renderNews.bind(this);
        this.createNews = this.createNews.bind(this);
        this.updateNews = this.updateNews.bind(this);
        this.sendNews = this.sendNews.bind(this);
    }

    componentDidMount() {
        // const res = axios.get('/app/getNews');
        this.setState({news: fakeNews});
    }

    renderNews(){

        const cards = this.state.news.map( (article, index)=> {
            return (
                <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                        {article.title}
                        <span className="right">
                            <Nav.Link onClick={this.updateNews}>Edit</Nav.Link>
                        </span>
                        <div style={{fontStyle: 'italic', fontSize: '12px'}}>{article.date}</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>{article.description}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        });
        return (
            <Accordion defaultActiveKey="0">
                {cards}
            </Accordion>
        );
    }

    sendNews(e) {

        const title = e.target.form.exampleFormControlInput1.value;
        const description = e.target.form.exampleFormControlTextarea1.value;

        if(this.state.send == "Submit") {

            const res = axios.post('/admin/createNews', {
                title,
                description,
                date: new Date()
            });

        }
        else if(this.state.send == "Save"){
            const res = axios.post('/admin/updateNews', {
                title,
                description,
                date: new Date()
            });

            this.setState({
                status: 'Create new',
                send: 'Submit'
            })
        }

    }

    createNews(){
        return(
            <Form>
                <Form.Group controlId="exampleFormControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="exampleFormControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.sendNews}>
                    {this.state.send}
                </Button>
            </Form>
        );
    }

    updateNews(){
        this.setState({
            status: 'Update',
            send: 'Save'
        });
    }

    render(){
        return(
            <div>
                <Tab.Container id="leftTabsExample" defaultActiveKey="first" >
                    <Nav variant="pills" className="">
                        <Nav.Item>
                            <Nav.Link eventKey="first">View old</Nav.Link>
                        </Nav.Item>
                        <Nav.Item active>
                            <Nav.Link eventKey="second">{this.state.status}</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Row sm={1}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {this.renderNews()}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {this.createNews()}
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        );
    }

};

export default NewsPanel;