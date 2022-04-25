import FormField from "./default/FormField";
import {Button, Form} from "react-bootstrap";
import {Multiselect} from "multiselect-react-dropdown";
import * as React from "react";
import "../css/BannerDemonstrate.css"
import {useState} from "react";
import {useEffect} from "react";
import CategoryService from "../services/CategoryService";
import BannerService from "../services/BannerService";
import {useLocation, useParams, useSearchParams} from "react-router-dom";

export default function BannerDemonstrateComponent (props) {

    const [categoryOptions, setCategoryOptions] = useState([]);

    const useMountEffect = (fun) => useEffect(fun, []);

    const location = useLocation();

    useMountEffect(() => {
        getAllCategories()
        if(location.pathname !== "/bid")getRandomBanner()
        else
        BannerService.getBannerByCategoriesPreMadePath( location.pathname + location.search).then(response => {
            console.log(response)
            if (response.status === 204) props.alert.info("Can't find any banner")
            else setData(response.data)
        })
        console.log(location.pathname)
        console.log(location.search)
    })

    function getAllCategories() {
        CategoryService.getAllCategories().then(response => {
            console.log(categoryOptions)
            setCategoryOptions(response.data)
            console.log(categoryOptions)
        })
    }

    function getRandomBanner() {
        BannerService.getRandomBanner().then(response => {
            console.log(response)
            if (response.status === 204) props.alert.info("You have seen all banners")
            else {
                setData(response.data)
            }
        })

    }

    const [data, setData] = useState([{name: "", price: "", content: ""}]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const onSelectCategory = (value) => {
        setSelectedCategories(value)
        console.log(selectedCategories)
        let categories = []
        value.forEach(elem => categories.push(elem.id))
        console.log(categories)
    }

    const onClickSearch = () => {
        clearForms()
        console.log(selectedCategories)
        BannerService.getBannerByCategories(selectedCategories).then(response => {
            console.log(response)
            if (response.status === 204) props.alert.info("Can't find any banner")
            else setData(response.data)
        })
        console.log("search")
    }

    const clearForms = () => {
        setData({name: "", price: "", categories: [], content: ""})
    }

    return (
        <div>
            <div className="bannerDemonstrateBox">
                <Form.Group controlId="name" className="bannerBoxField">
                    <Form.Label className="bannerBoxLabel">Name</Form.Label>
                    <Form.Control value={data.name} className="bannerBoxPlaceholder" disabled={true}/>
                </Form.Group>

                <Form.Group controlId="price" className="bannerBoxField">
                    <Form.Label className="bannerBoxLabel">Price</Form.Label>
                    <Form.Control value={data.price} className="bannerBoxPlaceholder" disabled={true}/>
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label className="bannerBoxLabel">Text</Form.Label>
                    <Form.Control className="bannerBoxText"
                                  as="textarea"
                                  rows="6"
                                  value={data.content}
                                  disabled={true}/>
                </Form.Group>
            </div>
            <div>
                <Form.Group controlId="categoryId" className="bannerBoxField">
                    <Form.Label className="bannerBoxLabel">Category</Form.Label>
                    <Multiselect
                        isObject={true}
                        options={categoryOptions}
                        displayValue="name"
                        className="bannerMultiselect"
                        onSelect={(value) => {
                            onSelectCategory(value)
                        }}
                        onRemove={(value) => {
                            onSelectCategory(value)
                        }}
                    />
                </Form.Group>
                <Button className="searchButton"
                        onClick={() => {onClickSearch()}}>
                    Search
                </Button>
            </div>
        </div>

    )
}