export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	photo: string;
	phoneNumber: string;
	createdAt: string;
	updatedAt: string;
	roles: Role[];
	organization: IOrganization;
}

  export interface IOrganization {
	id: string;
	name: string;
	category: string;
	address: string;
	tags: string[];
	userId: string;
	createdAt: string;
	updatedAt: string;
	organizationUser: IUser;
  }

  
  export interface Role {
	id: string;
	userId: string;
	role: string;
  }
  

  export interface IFeedback {
	id: string;
	category: string;
	description: string;
	location: string;
	phoneNumber: string;
	ticket: string | null;
	galleryImages: string[];
	organizationIds: string[];
	feedbackStatus: 'RESOLVED' | 'UNRESOLVED' ;
	responseStatus: 'ANSWERED' | 'PENDING' | 'CLOSED';
	userId: string;
	createdAt: string;
	updatedAt: string;
	response: IFeedbackResponseItem[];
  }
  
  export interface IFeedbackResponseItem {
	id: string;
	feedbackId: string;
	subject: string;
	description: string;
	photo: string;
	organizationId: string;
	createdAt: string;
	updatedAt: string;
	organization: IOrganization;
  }

  