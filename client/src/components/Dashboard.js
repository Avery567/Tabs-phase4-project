import { Layout, Menu } from 'antd';

const { Header, Content, Sider } = Layout;

function Dashboard({ setUser }) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        })}
    return (
        <Layout className="box">
            <Header className="header" >
                <h1>Tab-Tab-Tab</h1>
            </Header>
            <Layout>
                <Sider width={250} id="sidebar">
                    <Menu
                    mode="inline"
                    >
                        <Menu.Item key={0}>Current Tabs</Menu.Item>
                        <Menu.Item key={1}>Start New Tab</Menu.Item>
                        <Menu.Item key={2}>Completed Tabs</Menu.Item>
                        <Menu.Item key={3} onClick={handleLogoutClick}>Logout</Menu.Item>
                    </Menu>
                </Sider>
            <Layout>
                <Content id='content'>
                Content
                </Content>
            </Layout>
            </Layout>
        </Layout>
    )
}

export default Dashboard