import { Link } from "react-router-dom"
import Carol from "../../resources/img/404.jpg"
import './404.scss'

const Page404 = () => {
    return (
        <div className="error">
            <div className="error__text">
                <h1>404 page not found</h1>
                <h4>HYDRA has stolen this page from S.H.I.E.L.D. database!</h4>
                <p>Check that you typed the address correctly, go back to your previous page <br/> or click this button.</p>
                <Link to={'/MarvelApp'} className="button button__main">
                    <div className="inner">Homepage</div>
                </Link>
            </div>
            
            <img src={Carol} alt="error 404" className="error__img"/>
        </div>
        
    )
}

export default Page404;