import { Button, Form, Grid, Input, Modal, TimePicker, notification } from "antd";
import * as FormStyled from "../../BecomeTutor/Form.styled";
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";
import { FieldType } from "../../BecomeTutor/Form.fields";
import { theme } from "../../../themes";
import { addAvailableSchedule } from "../../../api/tutorRegisterAPI";
import moment from "moment";
const { useBreakpoint } = Grid;

interface ScheduleProps {
    tutorId: number;
}

const ScheduleForm: React.FC<ScheduleProps> = (props) => {
    const { tutorId } = props;
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    //---------------------------MODAL---------------------------
    function showModal() {
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    const handleOk = async (values: any) => {
        setLoading(true); // Set loading state to true when form is submitted
        try {
            await saveTutorAvailableTimeslots(tutorId, values)
            api.success({
                message: 'Your schedule have been updated!',
            });
        } catch (error: any) {
            api.error({
                message: 'Error updating schedule',
                description: error.response.data.message || error.message,
            });
        } finally {
            setLoading(false);
            setIsFormOpen(false);
            api.success({
                message: 'Refresh to see your newly changed schedule',
            })
        }

    };


    //--------------------------FORM--------------------
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const screens = useBreakpoint()
    const validateIntegerInRange = (_: unknown, value: number) => {
        const parsedValue = Number(value);
        if (!(Number.isInteger(parsedValue)) || value < 1 || value > 8) {
            return Promise.reject("Please enter a valid integer between 1 and 8");
        }
        return Promise.resolve();
    };

    interface VisibilityState {
        [key: string]: boolean;
    }
    type FormState = {
        [key in keyof VisibilityState]: FieldType[];
    };

    const handleDayVisibility = (day: string, checked: boolean) => {
        setVisibilityForDay(day, checked);
      }
    
      const handleAddTimeslot = (day: string) => {
        setTimeslotForm(prevState => {
          const newIndex = (prevState[day].length);
          return {
            ...prevState,
            [day]: [...prevState[day], timeslotSelection(day, newIndex, null)],
          };
        });
      }
    
    
      const handleRemoveTimeslot = (day: string, formIndex: number) => {
        setTimeslotForm(prevState => ({
          ...prevState,
          [day]: prevState[day].filter((_, index) => index !== formIndex),
        }));
      }

    const [visibility, setVisibility] = useState<VisibilityState>({
        'monday': true,
        'tuesday': true,
        'wednesday': true,
        'thursday': true,
        'friday': true,
        'saturday': true,
        'sunday': true,
    })
    const [timeslotAgreement, setTimeslotAgreement] = useState<boolean>(false)
    const setVisibilityForDay = (day: string, value: boolean) => {
        setVisibility(prevState => ({ ...prevState, [day]: value }));
    };
    const handleInputChange = (
        day: string,
        index: number,
        value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
    ) => {
        setTimeslotForm((prevState) => {
            const updatedFields = prevState[day].map(
                (field, i) =>
                    i === index ? { ...field, initialValue: value } : field
            );
            return { ...prevState, [day]: updatedFields };
        });
    };

    const getDisabledTime = (day: string, index: number, form: FormState) => {
        const existingTimes = form[day]
            .filter((_, i) => i !== index)
            .map(field => field.initialValue)
            .filter(Boolean) as [Dayjs, Dayjs][];

        let latestEndTime: Dayjs;

        existingTimes.forEach(timeslot => {
            if (timeslot && timeslot[1]) {
                if (!latestEndTime || timeslot[1].isAfter(latestEndTime)) {
                    latestEndTime = timeslot[1];
                }
            }
        });

        return {
            disabledHours: () => {
                const hours = Array.from({ length: 24 }, (_, i) => i);
                if (!latestEndTime) {
                    return hours.filter(hour => hour < 5 || hour > 22);
                } else {
                    return hours.filter(hour => hour < 5 || hour > 22 || hour < latestEndTime.hour());
                }
            },
            disabledMinutes: (selectedHour: number) => {
                const minutes = Array.from({ length: 60 }, (_, i) => i);
                if (!latestEndTime || selectedHour > latestEndTime.hour()) {
                    return minutes.filter(minute => minute % 15 !== 0);
                }
                if (selectedHour === latestEndTime.hour()) {
                    return minutes.filter(minute => minute < latestEndTime.minute() || minute % 15 !== 0);
                }
                return minutes.filter(minute => minute % 15 !== 0);
            },
        };
    };

    const validateRange = (_: unknown, value: [Dayjs, Dayjs]) => {
        const [start, end] = value;
        if (end.diff(start, 'minutes') > 240 || end.diff(start, 'hours') < 1) {
            return Promise.reject('The time range cannot exceed 4 hours');
        }
        return Promise.resolve();
    };

    const timeslotSelection = (day: string,
        index: number,
        initialValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null): FieldType => ({
            key: `${day}_${index}`,
            label: '',
            name: `${day}_timeslot_${index}`,
            rules: [
                {
                    required: true,
                    message: 'Please select your timeslot for this day.',
                },
                {
                    validator: validateRange,
                    message: 'A timeslot must be at least 1 hour and must not exceed 4 hours.',
                },
            ],
            children: (
                <TimePicker.RangePicker
                    size='small'
                    format={'HH:mm'}
                    minuteStep={15}
                    value={initialValue}
                    placeholder={['From', 'To']}
                    onChange={(times) => handleInputChange(day, index, times)}
                    disabledTime={() => getDisabledTime(day, index, timeslotForm)}
                    style={{ width: `100%` }} />
            ),
            $width: `90%`,
        })

    const initialFormState = (): FormState => {
        return daysOfWeek.reduce((acc, day) => {
            acc[day as keyof VisibilityState] = [timeslotSelection(day, 0, null)];
            return acc;
        }, {} as FormState);
    };

    const [timeslotForm, setTimeslotForm] = useState<FormState>(initialFormState())

    //---------------------------API SAVE---------------------------
    async function saveTutorAvailableTimeslots(tutorId: number, formData: any) {

        // Get JSON body from form data
        const jsonRequestBody = convertTimeslotsToJSON(formData);
        console.log(jsonRequestBody);
        const noOfWeeks = formData[`noOfWeek`];
        try {
    
          // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
          const responseData = await addAvailableSchedule(noOfWeeks, tutorId, jsonRequestBody);
    
          // Check response status
          if (!api.success) {
            throw new Error(`Error: ${responseData.statusText}`);
          }
    
          // Get response data
          console.log('Tutor available timeslots saved successfully:', responseData);
    
          // Return success response
          return responseData;
        } catch (error: any) {
          api.error({
            message: 'Lỗi',
            description: error.response ? error.response.data : error.message,
          });
        }
      }
    
      function convertTimeslotsToJSON(formData: any) {
        const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const jsonResult: { startTime: any; endTime: any; dayOfWeek: number; }[] = [];
    
        daysOfWeek.forEach((day, index) => {
          // Check for timeslots for the current day
          for (let i = 0; formData[`${day}_timeslot_${i}`]; i++) {
            const timeslot = formData[`${day}_timeslot_${i}`];
            if (timeslot && timeslot.length === 2) {
              const start = moment().set({ hour: i, minute: 0, second: 0 });
              const endTime = moment(start).add(1, 'hour').format("HH:mm:ss");
              const startTime = start.format("HH:mm:ss");
              console.log(startTime);
              console.log(endTime);
    
              jsonResult.push({
                startTime,
                endTime,
                dayOfWeek: index + 2, // Monday is 2, Sunday is 8
              });
    
            }
          }
        });
    
        return jsonResult;
      }


    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={showModal} style={{ borderRadius: `6px`, fontWeight: `bold`, width: `150px`, margin:`10px` }}>
                Edit schedule
            </Button>
            <Modal
                centered
                closable={false}
                width={'700px'}
                open={isFormOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[<FormStyled.ButtonDiv>
                    <Button key="Cancel" type="default" onClick={handleCancel} style={{ marginRight: '5%', width: '45%' }}>
                        Cancel
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={!timeslotAgreement}
                        form='schedule'
                        style={{ marginRight: '2%', width: '45%' }}
                    >
                        Send
                    </Button>
                </FormStyled.ButtonDiv>,]}
                styles={
                    {
                        content: {
                            borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
                        }
                    }}
            >
                <FormStyled.FormWrapper
                    id="schedule" //Adding the id to give the form a unique identifier, link the send button to the form
                    form={form}
                    labelAlign="left"
                    layout="vertical"
                    requiredMark="optional"
                    size="middle"
                    onFinish={handleOk}
                >
                    <FormStyled.FormContainer>
                        <FormStyled.FormTitle level={1}>Availability</FormStyled.FormTitle>
                        <FormStyled.FormDescription style={{ flexDirection: `column` }}><br />
                            <span style={{ fontWeight: `600` }}>Each timeslot represents a study session between you and the student. </span>
                        </FormStyled.FormDescription>

                        <FormStyled.FormContainer style={{ margin: '0', columnGap: '5%', width: '100%' }}>
                            {daysOfWeek.map((day) => (
                                <FormStyled.TimeslotStyle key={day}>
                                    <Form.Item
                                        name={day}
                                        valuePropName="checked"
                                        initialValue={visibility[day]}
                                        style={{ margin: '0', width: '100%' }}
                                    >
                                        <FormStyled.FormCheckbox
                                            style={{ margin: '0', width: '100%' }}
                                            checked={visibility[day]}
                                            defaultChecked={visibility[day]}
                                            onChange={(e) => handleDayVisibility(day, e.target.checked)}
                                        >
                                            {day.charAt(0).toUpperCase() + day.slice(1)}
                                        </FormStyled.FormCheckbox>
                                    </Form.Item>

                                    {visibility[day] && timeslotForm[day].map((field: FieldType, formIndex: number) => (
                                        <div style={{ width: '100%' }} key={`${day}_${formIndex}`}>
                                            <FormStyled.FormContainer style={{ columnGap: '3%' }} key={formIndex}>
                                                <FormStyled.FormItem
                                                    key={field.key}
                                                    label={field.label}
                                                    name={field.name}
                                                    rules={field.rules}
                                                    $width={field.$width ? field.$width : '100%'}
                                                    initialValue={field.initialValue}
                                                    validateFirst
                                                >
                                                    {field.children}
                                                </FormStyled.FormItem>
                                                {formIndex > 0 && (
                                                    <FormStyled.DeleteButton type='link' onClick={() => handleRemoveTimeslot(day, formIndex)} key={`${field.key}_X`}>
                                                        {screens.xs ? 'Delete Timeslot' : 'X'}
                                                    </FormStyled.DeleteButton>
                                                )}
                                            </FormStyled.FormContainer>
                                        </div>
                                    ))}
                                    {visibility[day] && (
                                        <Button type="dashed" onClick={() => handleAddTimeslot(day)} key={day}>
                                            Add another timeslot
                                        </Button>
                                    )}
                                </FormStyled.TimeslotStyle>
                            ))}
                            <FormStyled.FormItem
                                key='noOfWeek'
                                label='Number of weeks apply'
                                name='noOfWeek'
                                rules={[{
                                    required: true,
                                    message: 'You must insert in this field'
                                }, {
                                    validator: validateIntegerInRange,
                                    message: 'Please enter a valid integer between 1 and 8'
                                }]}
                                $width={'100%'}
                                validateFirst
                            >
                                <Input placeholder='Max 8' type='number' max='8' min='1' />
                            </FormStyled.FormItem>
                        </FormStyled.FormContainer>


                        <FormStyled.ReviewContainer>
                            <FormStyled.FormTitle style={{ fontSize: `24px`, color: `${theme.colors.black}`, marginTop: `-12px` }}>Are you sure you can teach at these times?</FormStyled.FormTitle>
                            {Object.keys(timeslotForm).map((day) => (
                                <div key={day} style={{ width: '30%' }}>
                                    <h4 style={{ marginBottom: '3px' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                                    {timeslotForm[day].map((field: FieldType) => (
                                        <li key={field.key}>
                                            {field.initialValue
                                                ? `${field.initialValue[0]?.format('HH:mm')} - ${field.initialValue[1]?.format(
                                                    'HH:mm'
                                                )}`
                                                : ''}
                                        </li>
                                    ))}
                                </div>
                            ))}
                            <FormStyled.FormItem
                                name='agreement'
                                valuePropName="checked"
                                rules={[{
                                    required: true,
                                    message: 'You must confirm your timeslots to proceed'
                                }]}
                                validateFirst
                            >
                                <FormStyled.FormCheckbox
                                    name='agreement'
                                    style={{ margin: `0px`, color: `${theme.colors.black}` }}
                                    checked={timeslotAgreement}
                                    defaultChecked={timeslotAgreement}
                                    onChange={(e) => setTimeslotAgreement(e.target.checked)}
                                >Yes, I'm available at those times.</FormStyled.FormCheckbox>
                            </FormStyled.FormItem>
                        </FormStyled.ReviewContainer>
                    </FormStyled.FormContainer>

                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
};

export default ScheduleForm;

