import { useEffect, useState } from "react"
import { Collapse, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TabCard from "./TabCard";

function CurrentTabs({ user }) {
    const { Panel } = Collapse;
    const [tabs, setTabs] = useState([])
    useEffect(()=>{
        fetch('/tabs').then(r=>r.json()).then(data=>setTabs(data))
    },[])
    console.log(tabs)
    return(
        <div id="currenttabs">
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

export default CurrentTabs