import { get, post, put } from '../utils/apiCaller';

export const getTutorByStatus = (status: string) => {
    return get(`/api/moderators/tutors?status=${status}`);
};

export const approveTutor = (tutorId: number, status:string, data: any) => {
    return put(`/api/moderators/tutors/${tutorId}?status=${status}`, data);
}

export const sendEmail = (approvalType:string, data: any) => {
    return post(`/api/moderators/send-verification-email?approvalType=${approvalType}`, data);
}

export const approveDocument = (tutorId:number, data: any) => {
    return put(`/api/moderators/documents/${tutorId}`, data);
}