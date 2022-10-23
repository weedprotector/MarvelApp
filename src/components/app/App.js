import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner"

import decoration from '../../resources/img/vision.png';


const App = () => {

    const [selectedChar, setChar] = useState(null);
    const [selectedComics, setComics] = useState(null);


    const onCharSelected = (id) => {
        setChar(id)
    }

    const onComicsSelected = (id) => {
        setComics(id)
    }


    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/MarvelApp">
                            <ErrorBoundary>
                                <RandomChar/>
                            </ErrorBoundary>
                            <div className="char__content">
                                <ErrorBoundary>
                                    <CharList onCharSelected={onCharSelected} selectedId={selectedChar}/>
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <CharInfo charId={selectedChar}/>
                                </ErrorBoundary>
                            </div>
                            <img className="bg-decoration" src={decoration} alt="vision"/>
                        </Route>
                        <Route exact path="/comics">
                            <AppBanner/>
                            <ComicsList onComicsSelected={onComicsSelected} selectedId={selectedComics}/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;