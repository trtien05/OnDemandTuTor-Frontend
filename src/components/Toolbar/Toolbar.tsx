import { Avatar, Dropdown, Space } from 'antd';
import UserOutlined from '@ant-design/icons';

import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { ToolbarProps } from './Toolbar.type';
import * as Styled from './Toolbar.styled';
import Link from '../Link';
import config from '../../config';
import { theme } from '../../themes';

const Toolbar = ({
    menu,
    avatar
}: ToolbarProps) => {
    return (
        <Styled.ToolbarAvatarWrapper>
            <Link to={config.routes.student.chatRoom}>
                <IoChatboxEllipsesOutline
                    size={28}
                    color={theme.colors.primary}
                    cursor="pointer"
                />
            </Link>

            <Dropdown menu={{ items: menu }} arrow placement="bottomRight" trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                    {avatar ? (
                        <Avatar size={40} src={avatar} alt="avatar" />
                    ) : (
                        <Avatar size={40} icon={<UserOutlined />} />
                    )}
                </Space>
            </Dropdown>
        </Styled.ToolbarAvatarWrapper>
    );
};

export default Toolbar;
