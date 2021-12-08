import { Button, Space, Modal, InputNumber, Form, Input, message } from 'antd';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined , DollarCircleOutlined  } from '@ant-design/icons';
import { Popconfirm } from 'antd';

function TabCard({ tab, user, handleDeleteTab }) {
    // line 8: state for popconfirm of delete function
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemValue, setItemValue] = useState(0)
    const [errors, setErrors] = useState([]);
    const [itemsToDisplay, setItemsToDisplay] = useState(tab.items)
    console.log(itemsToDisplay)
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const success = () => {
        message.success('New Item Created!');
      };

      function handleSubmit() {
        fetch("/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tab_id: tab.id,
                name: itemName,
                price: itemValue,
                completed: false,
                user_id: user.id
            }),
        }).then(r=>{
                if (r.ok) {
                    r.json().then((new_item=>{
                        setItemsToDisplay([...itemsToDisplay, new_item])
                        success()
                    }))
                } else {
                    r.json().then((err)=>setErrors([...errors, err.errors]))
                }
            })
      }
    // delete function starts here: 
    const showPopconfirm = () => {
        setVisible(true);   
    };

    const handleOkToDelete = () => {
        setTimeout(() => {
            setVisible(false);
        }, 2000);
        handleDeleteTab(tab.id);
    };

    const handleCancelDelete = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <div id="tabcard">
            <Space>
                <Button onClick={showModal}>
                    <PlusOutlined />
                    New Item
                </Button>
                <Modal title="Create New Item" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <Form
                        name="newitem"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        autoComplete="off"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input item name!',
                            },
                            ]}
                        >
                            <Input name="name" onChange={(e)=>{
                                setItemName(e.target.value)
                            }} />
                        </Form.Item>
                        <Form.Item
                            label="Cost"
                            name="cost"
                            rules={[
                            {
                                required: true,
                                message: 'Please input item cost!',
                            },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} step="0.0001" name="cost" onChange={(value)=>setItemValue(value)} />
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
                <Popconfirm
                    title="Are you sure you want to delete this tab? All items will be deleted all together. Think twice!!"
                    visible={visible}
                    onConfirm={handleOkToDelete}
                    onCancel={handleCancelDelete}
                    >
                    <Button onClick={showPopconfirm}>
                        <DeleteOutlined  />
                        Delete Tab
                    </Button>
                </Popconfirm>
                <Button>
                    <DollarCircleOutlined />
                    Settle
                </Button>
            </Space>
            {itemsToDisplay.length>0? 
            <div>
                {itemsToDisplay.map((item,index)=>{
                    <p key={index}>{item.name}</p>
                })}
            </div>:
            <h2>No item at the moment, please add new items!</h2>}
        </div>
    )
}

export default TabCard