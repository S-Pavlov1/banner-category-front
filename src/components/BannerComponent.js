import * as React from "react";
import {Button, Form} from 'react-bootstrap';
import FormField from "./default/FormField";
import "../css/SearchBox.css";
import "../css/BannerCreate.css";
import "../css/Buttons.css"

function BannerSearchBox() {
    return (
        <div className="search-Box">
            <div>
                <div className="search-Title">
                    Banners:
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
                Create new Banner
            </Button>
        </div>
    )
}

function BannerCreationBox() {
    return (
        <div className="bannerCreateBox">
            <FormField controlId="name"
                       label="Name"
                       text="Max length: 255 chars"/>
            <FormField controlId="price"
                       label="Price"
                       text="Max significant digits: 8. Max digits after decimal point: 2."/>
            <Form.Group controlId="categoryId" className="bannerBoxField">
                <Form.Label className="bannerBoxLabel">Category</Form.Label>
                <Form.Control as="select">
                    <option value="" selected disabled>Choose category</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label className="bannerBoxLabel">Text</Form.Label>
                <Form.Control className="bannerBoxText"
                              as="textarea"
                              rows="6"/>
            </Form.Group>
            <div className="buttonDiv">
                <Button className="buttonCreate"> Save </Button>
                <Button className="buttonDelete"> Delete </Button>
            </div>
        </div>
    )
}

export default function BannerComponent(props) {
    return (
        <div>
            <BannerCreationBox/>
            <BannerSearchBox/>
        </div>
    )

}
