import * as React from "react";
import {Button, Form} from "react-bootstrap";
import FormField from "./default/FormField";
import "../css/SearchBox.css";
import "../css/BannerCreate.css";
import "../css/Buttons.css"
import "../css/CategoryCreateBox.css"
import CategoryService from "../services/CategoryService"
import {useState} from "react";

function CategoryCreationBox(props) {

    const addCategory = () => {
        console.log("creating " + props.category)
        CategoryService.addCategory(props.category).then(response => console.log(response))
    };

    const updateCategory = () => {
        console.log("updating " + props.category)
        CategoryService.updateCategory(props.category).then(response => console.log(response))
    }

    const deleteCategory = () => {
        console.log("deleting " + props.category)
        CategoryService.deleteCategory(props.category.id).then(response => console.log(response))
        props.setHttpRequest("POST")
        clearForms()
    }

    const clearForms = () => {
        props.setCategory({name:"", requestId:""})
    }

    const handleChangeRequestName = value => {
        props.setCategory((prevState) => ({...prevState, requestId:value}))
        console.log(props.category.requestId)
    }

    const handleChangeName = value => {
        props.setCategory((prevState) => ({...prevState, name:value}))
        console.log(props.category.name)
    }

    return(
        <div className="CategoryCreateBox">
            <FormField controlId="name"
                       label="Name"
                       value={props.category.name}
                       onChange={(event) => {handleChangeName(event.target.value)}}/>
            <FormField controlId="requestName"
                       label="Request name"
                       value={props.category.requestId}
                       onChange={(event) => {handleChangeRequestName(event.target.value)}}/>
            <div className="buttonDiv">
                <Button className="buttonCreate"
                        onClick={() => {props.httpRequest === "POST" ? addCategory() : updateCategory()}}> Save </Button>
                <Button className="buttonDelete"
                        onClick={() => {props.httpRequest === "POST" ? clearForms() : deleteCategory()}}> Delete </Button>
            </div>
        </div>
    )
}

function CategorySearchBox(props) {

    const [searchResults,setSearchResults] = useState([]);

    const handleSearchRequestChange = value => {
        CategoryService.search(value).then(response => {
            setSearchResults(response.data)
            console.log(searchResults)
        })
    }

    const onClickSearchResult = (id,name, requestId) => {
        console.log(id+ " and " + name + " and " + requestId)
        props.setHttpRequest("PUT");
        props.setCategory({id: id, name: name, requestId:requestId})
    }

    const mapSearchResults = () => searchResults.map(
        res => (
            <Button className="searchResultButton"
                    key={res.id}
                    onClick={() => {onClickSearchResult(res.id,res.name,res.requestId)
                    }}>
                {res.name}
            </Button>
        )
    )

    const onClickCreateNewCategory = () => {
        console.log("new category");
        props.setHttpRequest("POST");
        props.setCategory({name: "", requestId:""})
    }


    return (
        <div className="search-Box">
            <div>
                <div className="search-Title">
                    Categories:
                </div>
                <Form>
                    <Form.Group controlId="search">
                        <Form.Control className="search-Form" placeholder="Enter name..."
                                      onChange={(event) => {handleSearchRequestChange(event.target.value)}}/>
                    </Form.Group>
                </Form>
            </div>
            <div className="search-List">
                {mapSearchResults()}
            </div>
            <Button
                className="search-Button"
                variant="primary"
            onClick={()=>{onClickCreateNewCategory()}}>
                Create new Category
            </Button>
        </div>
    )
}


export default function CategoryComponent (props) {

    const [httpRequest, setHttpRequest] = useState("POST");

    const [category, setCategory] = useState({name: "", requestId:""});

    return (
        <div>
            <CategoryCreationBox
                category={category}
                setCategory={(category)=>{setCategory(category)}}
                httpRequest={httpRequest}
                setHttpRequest={(type) => {setHttpRequest(type)}}/>
            <CategorySearchBox
                setCategory={(category)=>{setCategory(category)}}
                setHttpRequest={(type) => {setHttpRequest(type)}}/>
        </div>
    )
}

export const httpTYPE = { POST: "POST", PUT:"PUT"}
