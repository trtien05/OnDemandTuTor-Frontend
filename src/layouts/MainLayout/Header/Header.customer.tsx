import {
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
} from 'react-icons/ai';
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentDuotone } from "react-icons/pi";
import { GrContact } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";

import { Avatar, Divider, Typography } from 'antd';
import { HeaderAvatarWrapper, NavbarLink } from './Header.styled';
import { MenuType, PIIProps } from './Header.type';

import Link from '../../../components/Link'
import { LinkEnum } from '../../../utils/enums';
import { UserOutlined } from '@ant-design/icons';
import config from '../../../config';
import cookieUtils from '../../../utils/cookieUtils';

const { Text } = Typography;

/* ==================== Menu ==================== */
const createMenuItem = (
    key: string,
    icon: JSX.Element,
    title: string,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
) => ({
    key: key,
    label: (
        <Link to={key} onClick={onClick}>
            {icon}
            {title}
        </Link>
    ),
});

export const menuUnLogged = () => {
    const menu: MenuType[] = [
        createMenuItem(config.routes.public.home, <AiOutlineHome size={20} />, 'Home'),
        createMenuItem(config.routes.public.searchClasses, <SiGoogleclassroom size={20} />, 'Classes'),
        createMenuItem(
            config.routes.public.searchTutors,
            <PiStudentDuotone size={20} />,
            'Tutors',
        ),
        createMenuItem(
            config.routes.public.contact,
            <GrContact size={20} />,
            'Contact',
        ),
        createMenuItem(
            config.routes.student.registerTutor,
            <FaChalkboardTeacher size={20} />,
            'Become A Tutor',
        ),
        createMenuItem(config.routes.public.login, <AiOutlineLogin size={20} />, 'Login'),
    ];

    return menu;
};

export const menuLogged = (user: PIIProps) => {
    const handleLogout = () => {
        cookieUtils.removeItem(config.cookies.token);
    };

    const menu: MenuType[] = [
        {
            key: config.routes.student.profile,
            label: (
                <HeaderAvatarWrapper>
                    <Link to={config.routes.student.profile}>
                        {user?.avatarUrl ? (
                            <Avatar size={90} src={user.avatarUrl} alt={user.fullName} />
                        ) : (
                            <Avatar size={90} icon={<UserOutlined />} />
                        )}
                    </Link>
                    <Text>{user?.fullName}</Text>
                    <Divider />
                </HeaderAvatarWrapper>
            ),
        },

        ...menuUnLogged().slice(0, -1),

        createMenuItem(
            config.routes.student.chatRoom,
            <IoChatboxOutline size={20} />,
            'Chat room',
        ),
        createMenuItem(
            config.routes.public.login,
            <AiOutlineLogout size={20} />,
            'Logout',
            handleLogout,
        ),
    ];

    return menu;
};

/* ==================== Navbar ==================== */
const navbarProps = {
    type: LinkEnum.NAV_LINK,
    underline: true,
    scroll: true,
};

const createNavbarItem = (key: string, title: string) => ({
    key: key,
    label: (
        <NavbarLink to={key} {...navbarProps}>
            {title}
        </NavbarLink>
    ),
});

export const navbar: MenuType[] = [
    createNavbarItem(config.routes.public.home, 'Home'),
    createNavbarItem(config.routes.public.searchTutors, 'Tutors'),
    createNavbarItem(config.routes.public.searchQuestions, 'Questions'),
    createNavbarItem(config.routes.student.registerTutor, 'Become A Tutor'),
];