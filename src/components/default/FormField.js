import {Form} from "react-bootstrap";
import "../../css/BannerCreate.css"

export default function FormField(props) {
    return (
        <Form.Group controlId={props.controlId} className="bannerBoxField">
            <Form.Label className="bannerBoxLabel">{props.label}</Form.Label>
            <Form.Control value={props.value} className="bannerBoxPlaceholder"/>
        </Form.Group>
    )
}