import { Steps, Typography } from "antd";
import * as FormStyled from "./Form.styled"
import { useState } from "react";
import { educationForm, FieldType } from './Form.fields';
// import Form1 from "./Form1";

import Form1 from "./Form1"
import Form2 from "./Form2";
import MultipleSteps from "./MultipleSteps";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import { theme } from "../../themes"
export default function FirstPage() {
  const [aboutValues, setAboutValues] = useState(null);
  const [educationValues, setEducationValues] = useState(null);
  const [certificationValues, setCertificationValues] = useState(null);
  const [descriptionValues, setDescriptionValues] = useState(null);
  const [timePriceValues, setTimePriceValues] = useState(null);
  const [agreement, setAgreement] = useState<boolean>(false)
  const [isTicked, setIsTicked] = useState<boolean>(false);
  const [form, setForm] = useState<FieldType[][]>([educationForm]);
  const {Title} = Typography;
  const onFinishAboutForm = (values: any) => {
    setAboutValues(values);
    next();
  };
  const onFinishEducationForm = (values: any) => {
    setEducationValues(values);
    next();
  };
  const onFinishCertificationForm = (values: any) => {
    setCertificationValues(values);
    next();
  };
  const onFinishDescriptionForm = (values: any) => {
    setDescriptionValues(values);
    next();
  };
  const onFinishTimePriceForm = (values: any) => {
    setTimePriceValues(values);
    console.log(aboutValues,educationValues,certificationValues,descriptionValues,timePriceValues)
    next();
  };
  const onClickBack = () => {
    back()
  }
  const handleAgreementChange = (checked: boolean) => {
    setAgreement(checked);
  };
  const handleTickChange = (checked: boolean) => {
    setIsTicked(checked);
  };
  
  const handleAddForm = () => {
    const newFieldKey = (form.length * educationForm.length);
    const newForm: FieldType[] = educationForm.map((field) => ({
      key: (field.key + newFieldKey),
      label: field.label,
      name: `${field.name}_${form.length}`,
      rules: field.rules,
      initialValue: field.initialValue,
      children: field.children,
      $width: field.$width,
    }));
    setForm([...form, newForm]);
    console.log(form)
  };
  const handleRemove = (formIndex: number) => {
    if (form.length > 1) {
      setForm(form.filter((_, index) => index !== formIndex));
    } else {
      alert('At least one form must be present.');
    }
  };
  const { current, back, step, next, goTo } = MultipleSteps([
    <Form1 onFinish={onFinishAboutForm} initialValues={aboutValues} agreement={agreement} onAgreementChange={handleAgreementChange}/>,
    <Form2 onFinish={onFinishEducationForm} initialValues={educationValues} onClickBack={onClickBack} form={form} onAddForm={handleAddForm} onRemoveForm={handleRemove} />,
    <Form3 onFinish={onFinishCertificationForm} initialValues={certificationValues} onClickBack={onClickBack} isTicked={isTicked} onTickChange={handleTickChange}/>,
    <Form4 onFinish={onFinishDescriptionForm} initialValues={descriptionValues} onClickBack={onClickBack}/>,
    <Form5 onFinish={onFinishTimePriceForm} initialValues={timePriceValues} onClickBack={onClickBack}/>
  ]);
  
  const isDisabled = (stepNumber: number) => {
    {
      /*Disable next step until previous step done*/
    }
    if (stepNumber == 0) {
      return false;
    }
    if (stepNumber == 1) {
      return aboutValues === null || agreement === false;
    }
    if (stepNumber == 2) {
      return aboutValues === null || educationValues === null ;
    }
    if (stepNumber == 3) {
      return (
        aboutValues === null ||
        educationValues === null ||
        certificationValues === null 
      );
    }
    if (stepNumber == 4 ) {
      return (aboutValues === null || 
      educationValues === null ||
      certificationValues === null ||
      descriptionValues === null
      );
    }
  };

  return (
    <>
      <Title
        style={{ color: `${theme.colors.primary}`, textTransform: `capitalize`}}>Become our tutor!
        </Title>
        <div style={
          {
            margin:`30px 0px 20px`
          }
        }>
          {/* disabled={isDisabled(0)} */}
          <Steps current={current} onChange={goTo}>
            <Steps.Step disabled={isDisabled(0)} title="About"></Steps.Step>
            <Steps.Step disabled={isDisabled(1)} title="Education"></Steps.Step>
            <Steps.Step disabled={isDisabled(2)} title="Certification"></Steps.Step>
            <Steps.Step disabled={isDisabled(3)} title="Description"></Steps.Step>
            <Steps.Step disabled={isDisabled(4)} title="Availability & Pricing"></Steps.Step>
          </Steps>
        </div>
      
      {step}
      
    </>
  );
}
