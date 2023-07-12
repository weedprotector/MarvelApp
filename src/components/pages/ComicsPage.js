import { useState } from "react";
import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {

    const [selectedComics, setComics] = useState(null);

    const onComicsSelected = (id) => {
        setComics(id)
    }

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with comics list"
                />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected} selectedId={selectedComics}/>
        </>
    )
}

export default ComicsPage;