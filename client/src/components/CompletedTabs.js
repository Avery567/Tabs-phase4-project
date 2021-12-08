import { useEffect, useState } from "react"
import { Collapse } from 'antd';
import TabCard from "./TabCard";

function CompletedTabs({ user }) {

    const { Panel } = Collapse;
    const [tabs, setTabs] = useState([])

    useEffect(()=>{
        fetch('/tabs')
        .then(r=>r.json())
        .then(tabs=>setTabs(
            tabs.filter(tab => tab.completed == true)
            ))
    },[])
    // console.log(tabs)

    return(
        <div id="completedtabs">
            <Collapse>
                {tabs.map(tab=>{
                    return (
                    <Panel header={tab.name} key={tab.id}>
                        <TabCard user={user} tab={tab} />
                    </Panel>)
                })}
            </Collapse>
        </div>
    )
}

export default CompletedTabs