
import './Breadcumb.css';
function Home(props) {

    return (


        <nav className="breadcrumb">
            <ul className="bread">
                <li className="crumb-item">
                    <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5">
                        <path d="M4.62,1.39L3.27.28C2.83-.09,2.17-.09,1.73.28L.38,1.39c-.24.2-.38.5-.38.82v1.74c0,.56.43,1.05,1,1.05h.5c.28,0,.5-.22.5-.5v-.81c0-.32.24-.55.5-.55s.5.23.5.55v.81c0,.28.22.5.5.5h.5c.57,0,1-.48,1-1.05v-1.74c0-.32-.14-.62-.38-.82h0Z"/>
                    </svg>
                    <a href="">خانه</a>
                </li>

                <li className="crumb-item">
                    <a href={props.location}>{props.name}</a>
                </li>
            </ul>
        </nav>


    );
}

export default Home;
