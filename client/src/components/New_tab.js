import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import DebounceSelect from './DebounceSelect';

function New_tab({ user }) {
    const [value, setValue] = useState([]);
    const [tabName, setTabName] = useState("")
    async function fetchUserList() {
        return fetch("/users")
            .then(r=>r.json())
            .then((data)=>
                data.map((user)=>({
                    label: `${user.id} ${user.full_name}`,
                    key: user.id,
                    value: user.email,
                }))
            )
    }
    function handleInputChange(e) {
        setTabName(e.target.value)
    }
    function handleSubmit() {
        const users = [user.id] + value.map(v=>{return(v.label[0])})
        fetch("/tabs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: tabName,
                completed: false
            }),
        }).then(r=>r.json()).then(newtab=>{
            handleSubmit2(newtab.id)
        })
        
    }

    function handleSubmit2(tab_id) {
        const users = value.map(v=>{return(v.label[0])})
        users.map((user)=>{
            fetch("/usertabs", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: parseInt(user),
                    tab_id: tab_id
                }),
            }).then(r=>r.json()).then(data=>{console.log(data)})
        })
    }
    
    
    return (
        <Form
        name="newtab"
        layout="vertical"
        wrapperCol={{
            span: 13,
          }}
        onFinish={handleSubmit}
        >
            <Form.Item
                label="Tab Name"
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Please input new tab name!',
                },
                ]}
            >
                <Input onChange={handleInputChange} size="large" />
            </Form.Item>
            <Form.Item
                label="Participants"
                name="participants"
                rules={[
                {
                    required: true,
                    message: 'Please select tab participants!',
                },
                ]}
            >
                <DebounceSelect
                    mode="multiple"
                    value={value}
                    placeholder="Select users"
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
            </Form.Item>
            <Button htmlType="submit" size="large">
                Submit
            </Button>
        </Form>
    )
}

export default New_tab