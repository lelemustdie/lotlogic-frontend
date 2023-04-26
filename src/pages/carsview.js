import Sidebar from "../components/sidebar";
import "./carsview.css"

export default function CarView() {
    const elements = []

    function isOcuppied(event) {
        event.target.classList.toggle('free');
        event.target.classList.toggle('occupied');
    }

    for (let i = 0; i <= 40; i++) {
        elements.push(<div className="grid-square free d-flex justify-content-center align-items-center" key={i}
                           onClick={isOcuppied}>{i}</div>)
    }

    return (
        <div className="row">
            <section className="col">
                <Sidebar/>

            </section>
            <section className="col">
                <div className="parking">
                    {elements}

                </div>
            </section>
        </div>
    )
}
