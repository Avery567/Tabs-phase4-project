import { useEffect, useState } from "react"
import { Collapse, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TabCard from "./TabCard";

function CurrentTabs({ user }) {
    const { Panel } = Collapse;
    const [tabs, setTabs] = useState([])

    useEffect(()=>{
        fetch('/tabs')
        .then(r=>r.json())
        .then(tabs=>setTabs(
            tabs.filter(tab => tab.completed == false)
            ))
    },[])

    const handleDeleteTab = (id) => {
        fetch(`/tabs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r=>r.json())
        .then(setTabs(tabs.filter(tab => tab.id !== id)))
    };

    return(
        <div id="currenttabs">
            <Collapse>
                {tabs.map(tab=>{
                    return (
                    <Panel header={tab.name} key={tab.id}>
                        <TabCard user={user} tab={tab} handleDeleteTab={handleDeleteTab}/>
                    </Panel>)
                })}
            </Collapse>
        </div>
    )
}

export default CurrentTabs