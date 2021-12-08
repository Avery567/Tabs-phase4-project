import { Button, Space, Modal, InputNumber, Form, Input, message, List } from 'antd';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined , DollarCircleOutlined  } from '@ant-design/icons';
import ItemCard from './ItemCard';

function TabCard({ tab, user }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemValue, setItemValue] = useState(0)
    const [errors, setErrors] = useState([]);
    const [form] = Form.useForm();
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

      function handleDelete(id) {
          fetch(`/items/${id}`,{
              method:"DELETE"
          })
          .then(r=>{
            if (r.ok) {
                let newList = itemsToDisplay.filter((item)=>{
                    return (item.id!==id)
                })
                setItemsToDisplay(newList)
            }
          })
      }
      const success = () => {
        message.success('New Item Created!');
      };
      console.log(itemsToDisplay)
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
                        setIsModalVisible(false)
                    }))
                } else {
                    r.json().then((err)=>setErrors([...errors, err.errors]))
                }
            })
        form.resetFields()
      }
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
                        form={form}
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
                <Button>
                    <DeleteOutlined  />
                    Delete Tab
                </Button>
                <Button>
                    <DollarCircleOutlined />
                    Settle
                </Button>
                You Currently owe:
            </Space>
            <div id="itemcard">
                {itemsToDisplay.length>0? 
                <Space direction="vertical">
                    {itemsToDisplay.map((item)=>{
                        return (<ItemCard key={item.id} item={item} handleDelete={handleDelete} />)
                    })}
                </Space>:
                <h2>No item at the moment, please add new items!</h2>}
            </div>
        </div>
    )
}

export default TabCard