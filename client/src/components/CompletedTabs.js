import { useEffect, useState } from "react"
import { Collapse, message } from 'antd';

function CompletedTabs({ user }) {
    const { Panel } = Collapse;
    const [tabs, setTabs] = useState([])

    useEffect(()=>{
        fetch('/tabs').then(r=>r.json()).then(data=>{
            let incomplete_tabs = data.filter(tab=>{
                return tab.completed===true
            })
            setTabs(incomplete_tabs)
        })
    },[])
    return(
        <div id="currenttabs">
            <Collapse>
                {tabs.map(tab=>{
                    return (
                    <Panel header={tab.name} key={tab.id}>
                        <p>works?</p>
                    </Panel>)
                })}
            </Collapse>
        </div>
    )
}

export default CompletedTabs