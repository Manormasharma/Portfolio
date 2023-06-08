import HeroBanner from "../../components/Homepage-comp/Hero-banner";
import About from "../About/about";
import Project from "../Project/Project";
import './homepage.scss';

function Home() {
    return (
        <>
            <HeroBanner />
            <About />
            <Project />
        </>
    );
}

export default Home;
