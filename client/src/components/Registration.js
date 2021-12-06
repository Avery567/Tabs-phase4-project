import { Button, Modal, Form, Input } from 'antd';
import { useState } from 'react';

function Registration() {
    const [isRsvpVisible, setRsvpVisible] = useState(false)
    const [rsvpInfo, setRsvpInfo] = useState({
        username: "",
        email: "",
        password: "",
        passwordconfirmation: ""
    })
    function showRsvp() {
        setRsvpVisible(true)
    }
    function handleClose() {
        setRsvpVisible(false)
    }
    function handleSubmit() {
        console.log("yes")
    }
    function handleInputChange(e) {
        setRsvpInfo({
            ...rsvpInfo, [e.target.name]:e.target.value
        })
        console.log(rsvpInfo)
    }
    return (
        <>
            <Button onClick={showRsvp}>Create New Account</Button>
            <Modal 
                title="User Registration" 
                visible={isRsvpVisible}
                onCancel={handleClose}
                onOk={handleClose}
                footer={null}
            >
                <Form
                    name="registration"
                    labelCol={{
                        span: 9,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input name="username" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}
                        
                    >
                        <Input name="email" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password name="password" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Password Confirmation"
                        name="passwordconfirm"
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ]}
                    >
                        <Input.Password name="passwordconfirmation" onChange={handleInputChange}  />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 10,
                        span: 16,
                        }}
                    >
                        <Button htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Registration