import Sidebar from "../components/sidebar";
import React from "react";

export default function Home() {
    return(
    <div className="row w-100">
        <section style={{paddingLeft:0}} className="col-3">
            <Sidebar/>
        </section>
    </div>
    )
}