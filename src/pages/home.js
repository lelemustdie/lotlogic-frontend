import Sidebar from "../components/sidebar";
import React from "react";

export default function Home() {
    return(
    <div className="row w-100">
        <section className="col-3">
            <Sidebar/>
        </section>
    </div>
    )
}