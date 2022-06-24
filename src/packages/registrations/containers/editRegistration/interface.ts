import { RegistrationStatus } from '../../../../core/models/registration';
import { Gender } from '../../../../core/models/user';

export interface EditRegistrationDTO {
    pricePackage: string;
    fullName: string;
    email: string;
    mobile: string;
    gender: Gender;
    registrationTime: string;
    status: RegistrationStatus;
    validFrom: string;
    validTo: string;
    note: string;
    sale: string;
}
