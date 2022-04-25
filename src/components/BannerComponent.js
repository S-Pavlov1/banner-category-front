import * as React from "react";
import {Button, Form} from 'react-bootstrap';
import FormField from "./default/FormField";
import "../css/SearchBox.css";
import "../css/BannerCreate.css";
import "../css/Buttons.css"
import {useEffect, useState} from "react";
import BannerService from "../services/BannerService";
import CategoryService from "../services/CategoryService"
import {Multiselect} from "multiselect-react-dropdown";
import {flushSync} from "react-dom";

function BannerSearchBox(props) {

    const [searchResults, setSearchResults] = useState([]);

    const useMountEffect = (fun) => useEffect(fun, []);

    useMountEffect(() => {
        handleSearchRequestChange("")
    })

    const handleSearchRequestChange = value => {
        BannerService.search(value).then(response => {
            setSearchResults(response.data)
            console.log(searchResults)
        })
    }

    const onClickSearchResult = (id, name, price, categories, text) => {
        props.setHttpRequest("PUT");
        console.log(id + " name: " + name + " price: " + price + " categories " + categories + "text " + text)
        props.setBanner({id: id, name: name, price: price, categories: categories, content: text})
    }

    const mapSearchResults = () => searchResults.map(
        res => (
            <Button className="searchResultButton"
                    key={res.id}
                    onClick={() => {
                        onClickSearchResult(res.id, res.name, res.price, res.categories, res.content)
                    }}>
                {res.name}
            </Button>
        )
    )

    const onClickCreateNewBanner = () => {
        console.log("new category");
        props.setHttpRequest("POST");
        props.setBanner({name: "", price: "", categories: [], content: ""})
    }

    return (
        <div className="search-Box">
            <div>
                <div className="search-Title">
                    Banners:
                </div>
                <Form>
                    <Form.Group controlId="search">
                        <Form.Control className="search-Form" placeholder="Enter name..."
                                      onChange={(event) => {
                                          handleSearchRequestChange(event.target.value)
                                      }}/>
                    </Form.Group>
                </Form>
            </div>
            <div className="search-List">
                {mapSearchResults()}
            </div>
            <Button
                className="search-Button"
                variant="primary"
                onClick={() => {
                    onClickCreateNewBanner()
                }}>
                Create new Banner
            </Button>
        </div>
    )
}

function BannerCreationBox(props) {

    const [categoryOptions, setCategoryOptions] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const useMountEffect = (fun) => useEffect(fun, []);

    useMountEffect(() => {
        getAllCategories()
    })

    const addBanner = () => {
        console.log("creating " + props.banner)
        BannerService.addBanner(props.banner).then(response => {
            props.alert.success("Successfully created banner")
            console.log(response)
        }).catch(error => {props.alert.info("ERROR: " + error.response.data)})
    };

    const updateBanner = () => {
        console.log("updating " + props.banner)
        BannerService.updateBanner(props.banner).then(response => {
            props.alert.success("Successfully updated banner")
            console.log(response)
        }).catch(error => {props.alert.info("ERROR: " + error.response.data)})
    }

    const deleteBanner = () => {
        console.log("deleting " + props.banner)
        BannerService.deleteBanner(props.banner.id).then(response => {
            props.alert.success("Successfully deleted banner")
            console.log(response)
            props.setHttpRequest("POST")
            clearForms()
        }).catch(error => {props.alert.info("ERROR: " + error.response.data)})
    }

    const clearForms = () => {
        flushSync(() => {props.setBanner({name: "", price: "", categories: [], content: ""})})
    }

    const handleChangePrice = value => {
        props.setBanner((prevState) => ({...prevState, price: value}))
        console.log("price:" + props.banner.price)
    }

    const handleChangeName = value => {
        props.setBanner((prevState) => ({...prevState, name: value}))
        console.log("name: " + props.banner.name)
    }

    const handleChangeContent = value => {
        props.setBanner((prevState) => ({...prevState, content: value}))
        console.log("content: " + props.banner.content)
    }

    function getAllCategories() {
        CategoryService.getAllCategories().then(response => {
            console.log(categoryOptions)
            setCategoryOptions(response.data)
            console.log(categoryOptions)
        })
    }

    const onSelectCategory = (value) => {
        setSelectedCategories(value)
        console.log(selectedCategories)
        let categories = []
        value.forEach(elem => categories.push(elem.id))
        console.log(categories)
        props.setBanner((prevState) => ({...prevState, categories: categories}))
    }


    return (
        <div className="bannerCreateBox">
            <FormField controlId="name"
                       label="Name"
                       value={props.banner.name}
                       onChange={(event) => {
                           handleChangeName(event.target.value)
                       }}/>
            <FormField controlId="price"
                       label="Price"
                       value={props.banner.price}
                       onChange={(event) => {
                           handleChangePrice(event.target.value)
                       }}/>
            <Form.Group controlId="categoryId" className="bannerBoxField">
                <Form.Label className="bannerBoxLabel">Category</Form.Label>
                <Multiselect
                    isObject={true}
                    selectedValues={props.banner.categories.map(category => categoryOptions.find(element => element.id === category))}
                    options={categoryOptions}
                    displayValue="name"
                    onSelect={(value) => {
                        onSelectCategory(value)
                    }}
                    onRemove={(value) => {
                        onSelectCategory(value)
                    }}
                    className="bannerMultiselect"
                />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label className="bannerBoxLabel">Text</Form.Label>
                <Form.Control className="bannerBoxText"
                              as="textarea"
                              rows="6"
                              value={props.banner.content}
                              onChange={(event) => {
                                  handleChangeContent(event.target.value)
                              }}/>
            </Form.Group>
            <div className="buttonDiv">
                <Button className="buttonCreate"
                        onClick={() => {
                            props.httpRequest === "POST" ? addBanner() : updateBanner()
                        }}> Save </Button>
                <Button className="buttonDelete"
                        onClick={() => {
                            props.httpRequest === "POST" ? clearForms() : deleteBanner()
                        }}> Delete </Button>
            </div>
        </div>
    )
}

export default function BannerComponent(props) {

    const [httpRequest, setHttpRequest] = useState("POST");

    const [banner, setBanner] = useState({name: "", price: "", categories: [], content: ""});


    return (
        <div>
            <BannerCreationBox
                alert={props.alert}
                banner={banner}
                setBanner={(banner) => {
                    setBanner(banner)
                }}
                httpRequest={httpRequest}
                setHttpRequest={(type) => {
                    setHttpRequest(type)
                }}/>
            <BannerSearchBox
                setBanner={(banner) => {
                    setBanner(banner)
                }}
                setHttpRequest={(type) => {
                    setHttpRequest(type)
                }}/>
        </div>
    )

}
