import React from "react";
import IndianRegional from "../components/IndianRegional";
import PlaylistCategories from "../components/PlaylistCategories";
import Artists from "../components/Artists";
import Bands from "../components/Bands";
function Landing({ setSearchSuggestionWindowOpened, boilerPlateResults, indianCategory, westernPopularCategory, westernRockCategory, moodCategory }) {
    const categories = {
        indianCategory,
        westernPopularCategory,
        westernRockCategory,
        moodCategory
    };

    return (
        <div
            className="landing"
            onClick={(e) => setSearchSuggestionWindowOpened(false)}
        >
            <PlaylistCategories categoryMap={categories ? categories : null} />
            {/* artists */}
            <Artists
                genre="Indian"
                isIndian
                data={boilerPlateResults[0]?.artists[0]?.INDIAN}
                seeMoreIconText
            />
            {/* regional section */}
            <IndianRegional data={boilerPlateResults[0]?.regional} />
            {/* Bands */}
            <Bands
                genre="বাংলা"
                isIndian
                data={boilerPlateResults[0]?.bands[0]?.BANGLA}
            />
        </div>
    );
}

export default Landing;
