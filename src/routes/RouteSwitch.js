import {Route, Routes} from 'react-router-dom';
import BannerComponent from "../components/BannerComponent"
import CategoryComponent from "../components/CategoryComponent"
import BannerDemonstrateComponent from "../components/BannerDemonstrateComponent";

export default function  RouteSwitch(props) {
    return (
        <Routes>
            <Route path="/" element={<BannerDemonstrateComponent alert={props.alert}/>}></Route>
            <Route path="/banners" element={<BannerComponent alert={props.alert}/>}/>
            <Route path="/categories" element={<CategoryComponent alert={props.alert}/>}/>
            <Route path="/:path" element={<BannerDemonstrateComponent alert={props.alert}/>}></Route>
        </Routes>
    )
}