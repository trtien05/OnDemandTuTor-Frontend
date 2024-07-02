import * as Styled from './Home.styled';

import { Col, Collapse, theme, Row, Skeleton, List } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';

import Container from '../../components/Container';

import ieltsImg from '../../assets/images/image5.png';
import mathImg from '../../assets/images/image6.png';
import programImg from '../../assets/images/image7.png';
import toeicImg from '../../assets/images/image8.png';

import feedbackImg from "../../assets/images/image17.png";
import { useDocumentTitle } from '../../hooks';
import DefaultBanner from '../../components/Banner/DefaultBanner';
import { RightOutlined } from '@ant-design/icons';
import { CollapseProps } from 'antd/lib';
import Link from '../../components/Link';
import config from '../../config';
import TutorsList from '../../components/TutorsList/TutorsList';
import { Tutor } from '../../components/TutorsList/Tutor.type';


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [

    {
        key: '1',
        label: <Styled.QuestionTitle level={3}>Flexible Scheduling</Styled.QuestionTitle>,
        children: <Styled.AnswerContent>{text}</Styled.AnswerContent>,
        style: panelStyle,
    },
    {
        key: '2',
        label: <Styled.QuestionTitle level={3}>Affordable Pricing</Styled.QuestionTitle>,
        children: <p style={{ 'color': '#fff' }}>{text}</p>,
        style: panelStyle,
    },
    {
        key: '3',
        label: <Styled.QuestionTitle level={3}>Industry-Expert Tutors</Styled.QuestionTitle>,
        children: <p style={{ 'color': '#fff' }}>{text}</p>,
        style: panelStyle,
    },
    {
        key: '4',
        label: <Styled.QuestionTitle level={3}>Customized support</Styled.QuestionTitle>,
        children: <p style={{ 'color': '#fff' }}>{text}</p>,
        style: panelStyle,
    },
];
const Home = () => {
    useDocumentTitle('Home | MyTutor');
    const [translateY, setTranslateY] = useState<number>(0);
    const [hoveredTutor, setHoveredTutor] = useState<Tutor>();
    const listCategory = [ieltsImg, mathImg, programImg, toeicImg];
    const [initLoading, setInitLoading] = useState(true);
    const { token } = theme.useToken();
    const [list, setList] = useState<Tutor[]>([]);
    const [data, setData] = useState<Tutor[]>([]);
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#B94AB7',
        padding: '10px',
    };

    useEffect(() => {
        const baseUrl: string = `https://my-tutor-render.onrender.com/api/tutors?pageNo=0&pageSize=3`;
        fetch(baseUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.content);
                setList(res.content);
            });
    }, []);
    return (
        <>
            <DefaultBanner />

            <Styled.BestServiceSection>
                <Container>
                    <Row align="middle" justify='center'>
                        <Col lg={12}>
                            <Styled.BestServiceTitle level={2}>
                                Popular Categories
                            </Styled.BestServiceTitle>

                            <Styled.BestServiceDesc>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Styled.BestServiceDesc>
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]} >
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImage src={listCategory[0]} alt="Ielts" />
                                </Styled.BestServiceImageDiv>

                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>
                            </Styled.BestServiceItem>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImageMath src={listCategory[1]} alt="Ielts" />

                                </Styled.BestServiceImageDiv>
                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>
                            </Styled.BestServiceItem>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImageProgram src={listCategory[2]} alt="Ielts" />

                                </Styled.BestServiceImageDiv>
                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>
                            </Styled.BestServiceItem>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImage src={listCategory[3]} alt="Ielts" />

                                </Styled.BestServiceImageDiv>
                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>

                            </Styled.BestServiceItem>
                        </Col>
                    </Row>
                </Container>
            </Styled.BestServiceSection>

            <Styled.BestTutorSection>
                <Container>
                    <Row align="middle" justify='center'>
                        <Col lg={12}>
                            <Styled.BestServiceTitle level={2}>
                                Best Tutors
                            </Styled.BestServiceTitle>
                            <Styled.BestServiceDesc>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Styled.BestServiceDesc>
                        </Col>

                    </Row>

                    <TutorsList initLoading={initLoading} list={list} />
                </Container>
            </Styled.BestTutorSection>



            <Styled.QuestionSection>
                <Container>
                    <Row gutter={[20, 20]} align="middle" justify='center' style={{ marginBottom: '30px' }}>
                        <Col lg={12}>
                            <Styled.BestServiceTitle level={2}>
                                FAQ
                            </Styled.BestServiceTitle>

                            <Styled.BestServiceDesc>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Styled.BestServiceDesc>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col lg={13} md={24} sm={24} xs={24}>
                            <Styled.AnswerWrapper>
                                <Collapse
                                    accordion
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    expandIcon={({ isActive }) =>
                                        <div style={
                                            {
                                                'backgroundColor': '#fff', 'width': '40px',
                                                'height': '40px',
                                                'color': '#B94AB7',
                                                'marginTop': '10px',
                                                'borderRadius': '50%',
                                                'display': 'flex',
                                                'justifyContent': 'center',
                                                'alignItems': 'center',
                                            }
                                        }>
                                            <RightOutlined rotate={isActive ? 90 : 0} onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />
                                        </div>
                                    }
                                    style={{ background: token.colorBgContainer }}
                                    items={getItems(panelStyle)}
                                    expandIconPosition='end'
                                />
                            </Styled.AnswerWrapper>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Styled.QuestionWrapper>
                                <Styled.QuestionTitleRight level={1}>What makes us the best academy online?</Styled.QuestionTitleRight>
                            </Styled.QuestionWrapper>
                        </Col>
                    </Row>
                </Container>
            </Styled.QuestionSection >

            <Styled.FeedbackSection>
                <Container>
                    <Row align='middle' justify='center' gutter={24}>
                        <Col lg={9} md={24} sm={24} xs={24}>
                            <Styled.FeedbackWrapper>
                                <Styled.FeedbackStudentContent>
                                    "Outstanding experience! The flexibility to learn at my own pace, coupled with expert instruction and tailored support, exceeded my expectations. Engaging with a diverse community of learners and educators enriched my learning journey. Highly recommended for anyone seeking quality education with a personal touch!"
                                </Styled.FeedbackStudentContent>

                                <Styled.FeedbackContent>

                                    <Styled.FeedbackImg src={feedbackImg} alt="feedback" />
                                    <Styled.StudentInfor>
                                        <Styled.SchoolName>
                                            College Student
                                        </Styled.SchoolName>
                                        <Styled.StudentName>
                                            ABC
                                        </Styled.StudentName>
                                    </Styled.StudentInfor>

                                </Styled.FeedbackContent>
                            </Styled.FeedbackWrapper>
                        </Col>
                        <Col lg={15} md={24} sm={24} xs={24}>
                            <Styled.QuestionFeedbackWrapper>
                                <Styled.QuestionTitleRight level={1}>What they say about us?</Styled.QuestionTitleRight>
                            </Styled.QuestionFeedbackWrapper>
                        </Col>
                    </Row>
                </Container>
            </Styled.FeedbackSection >
        </>
    );
};

export default Home;
