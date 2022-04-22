import * as React from "react";
import {Button, Form} from "react-bootstrap";
import FormField from "./default/FormField";
import "../css/SearchBox.css";
import "../css/BannerCreate.css";
import "../css/Buttons.css"
import "../css/CategoryCreateBox.css"

function CategorySearchBox() {
    return (
        <div className="search-Box">
            <div>
                <div className="search-Title">
                    Categories:
                </div>
                <Form>
                    <Form.Group controlId="search">
                        <Form.Control className="search-Form" placeholder="Enter name..."/>
                    </Form.Group>
                </Form>
            </div>
            <div className="search-List">
                Results
            </div>
            <Button
                className="search-Button"
                variant="primary">
                Create new Category
            </Button>
        </div>
    )
}

function CategoryCreationBox() {
    return(
        <div className="CategoryCreateBox">
            <FormField controlId="name"
                       label="Name"
                       text="Max length: 255 chars"/>
            <FormField controlId="price"
                       label="Request name"
                       text="Max significant digits: 8. Max digits after decimal point: 2."/>
            <div className="buttonDiv">
                <Button className="buttonCreate"> Save </Button>
                <Button className="buttonDelete"> Delete </Button>
            </div>
        </div>
    )
}


export default function CategoryComponent (props) {
    return (
        <div>
            <CategoryCreationBox/>
            <CategorySearchBox/>
        </div>
    )
}