import {Route, Routes} from 'react-router-dom';
import BannerComponent from "../components/BannerComponent"
import CategoryComponent from "../components/CategoryComponent"

export default function  RouteSwitch() {
    return (
        <Routes>
            <Route path="/banners" element={<BannerComponent/>}/>
            <Route path="/categories" element={<CategoryComponent/>}/>
        </Routes>
    )
}