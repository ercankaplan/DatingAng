export type Member = {
    id: string;
     email: string;
    dateOfBirth: string; // ISO date string
    imageUrl: string;
    displayName: string;
    created: string; // ISO date string
    lastActivity: string; // ISO date string
    gender: string;
    descriptiion?: string;
    city: string;
    country: string;
   
};

export type Photo = {
    id: number;
    url: string;
    memberId: string;
    publicId?: string;
};
