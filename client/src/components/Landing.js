import { Button, Space } from 'antd';
import Login from './Login';
import Registration from './Registration';

function Landing() {

    return (
        <div id="landing">
            <img src="https://doodleipsum.com/600?i=0e05d2d124e0a86b24727ce6006b739a" alt="Living Area by Irene Falgueras" />
            <h1 className="animate__animated animate__rubberBand animate__repeat-2">TAB-TAB-TAB</h1>
            <p>Spliting bills has never been this easy</p>
            <Space direction="vertical">
                <Login />
                <Registration />
            </Space>
        </div>
    )
}

export default Landing