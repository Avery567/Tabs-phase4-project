import { Button, Modal, Form, Input } from 'antd';
import { useState } from 'react';

function Registration({ onLogin }) {
    const [isRsvpVisible, setRsvpVisible] = useState(false)
    const [rsvpInfo, setRsvpInfo] = useState({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function showRsvp() {
        setRsvpVisible(true)
    }
    function handleClose() {
        setRsvpVisible(false)
    }
    console.log(rsvpInfo)
    function handleSubmit() {
        // e.preventDefault()
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rsvpInfo),
          }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
              r.json().then((user) => onLogin(user));
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
          });
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
                        label="Full Name"
                        name="full_name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                        ]}
                    >
                        <Input name="full_name" onChange={handleInputChange} />
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
                        <Input.Password name="password_confirmation" onChange={handleInputChange}  />
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