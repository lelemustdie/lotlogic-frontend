import React from "react";
import SidebarOwner from "../components/SidebarOwner";
import SidebarEmployee from "../components/SidebarEmployee";



export default function Home() {
    const role = localStorage.getItem('role');
    console.log(role);
    return (
        <div className="row w-100">
            <section style={{paddingLeft: 0}} className="col-3">
                {role === 'ADMIN' || role === 'OWNER' ? (
                    <SidebarOwner/>
                ) : (
                    <SidebarEmployee/>
                )}
            </section>
        </div>
    )
}
