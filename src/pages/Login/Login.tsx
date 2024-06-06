import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { loginFields } from '../../components/AuthForm/AuthForm.fields';
import config from '../../config';
import { login, loginGoogle } from '../../utils/authAPI';
import cookieUtils from '../../utils/cookieUtils';
import { PageEnum } from '../../utils/enums';
import { useDocumentTitle } from '../../hooks';

const Login = () => {
    useDocumentTitle('Log In | MyTutor');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {

        try {
            setIsSubmitting(true);

            const { data } = await login(values);
            if (!data) {
                throw new Error('Network response was not ok');
            } else {
                const { accessToken } = data;
                cookieUtils.setItem(config.cookies.token, accessToken);
                messageApi.success('Logged in successfully');
                setTimeout(() => {
                    navigate(config.routes.public.home);
                }, 2000);
            }
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);

            // if (error.response) messageApi.error();
            else messageApi.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onGoogleSignIn = async (values: any) => {
        try {
            const { data } = await loginGoogle(values);

            if (!data) {
                throw new Error('Network response was not ok');
            } else {
                messageApi.success('Logged in successfully');
                setTimeout(() => {
                    navigate(config.routes.public.home);
                }, 2000);
            }
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);
            else messageApi.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const redirect = {
        description: 'Don’t have an account?',
        title: 'Register',
        url: config.routes.public.register,
    };


    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.LOGIN}
                formTitle="Log In"
                buttonTitle="Log In"
                fields={loginFields}
                redirect={redirect}
                onFinish={onFinish}
                onGoogleSignIn={onGoogleSignIn}
                isSubmitting={isSubmitting}
                OTPFields={[]}
            />
        </>
    );
};

export default Login;
