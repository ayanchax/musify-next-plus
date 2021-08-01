import Row from "./Row";

function PlaylistCategories({ categoryMap }) {
    if (categoryMap) {
        return (<div>
            <div className="playlist__categories">
                {categoryMap?.indianCategory?.map((category) => (
                    <div key={category?.key}>
                        <Row
                            title={category?.key}
                            contents={category?.value}
                        />
                    </div>
                ))}


                {categoryMap?.westernPopularCategory?.map((category) => (
                    <div key={category?.key}>
                        <Row
                            title={category?.key}
                            contents={category?.value}
                        />
                    </div>
                ))}

                {categoryMap?.westernRockCategory?.map((category) => (
                    <div key={category?.key}>
                        <Row
                            title={category?.key}
                            contents={category?.value}
                        />
                    </div>
                ))}


                {categoryMap?.moodCategory?.map((category) => (
                    <div key={category?.key}>
                        <Row
                            title={category?.key}
                            contents={category?.value}
                        />
                    </div>
                ))}


            </div>

        </div>
        );
    } else return ""
}

export default PlaylistCategories;

