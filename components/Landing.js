import React, { useState, useEffect } from "react";
import IndianRegional from "../components/IndianRegional";
import PlaylistCategories from "../components/PlaylistCategories";
import Artists from "../components/Artists";
import axios from "../configurations/axios";
import Bands from "../components/Bands";

import { actionTypes } from "../configurations/reducer";
import { useDataLayerContextValue } from "../configurations/DataLayer";

import { categories } from "../configurations/requests";
function Landing({ setSearchSuggestionWindowOpened }) {
    const [{ _boilerPlateData }, dispatch] = useDataLayerContextValue();
    const [boilerPlateData, setBoilerPlateData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get("boilerplate");
            setBoilerPlateData(request.data);
            dispatch({
                type: actionTypes.SET_BOILER_PLATE_DATA,
                boilerPlateData: request.data,
            });
            return request;
        }
        fetchData();

    }, []);
    return (
        <div
            className="landing"
            onClick={(e) => setSearchSuggestionWindowOpened(false)}
        >
            <PlaylistCategories isIndian categoryMap={categories} />
            {/* artists */}
            <Artists
                genre="Indian"
                isIndian
                data={boilerPlateData[0]?.artists[0]?.INDIAN}
                seeMoreIconText
            />
            {/* regional section */}
            <IndianRegional data={boilerPlateData[0]?.regional} />
            {/* Bands */}
            <Bands
                genre="বাংলা"
                isIndian
                data={boilerPlateData[0]?.bands[0]?.BANGLA}
            />
        </div>
    );
}

export default Landing;
