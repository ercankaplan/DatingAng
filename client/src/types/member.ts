export type Member = {
    id: string;
     email: string;
    dateOfBirth: string; // ISO date string
    imageUrl: string;
    displayName: string;
    created: string; // ISO date string
    lastActive: string; // ISO date string
    gender: string;
    description?: string;
    city: string;
    country: string;
   
};

export type Photo = {
    id: number;
    url: string;
    memberId: string;
    publicId?: string;
    isMain: boolean;
};

export type EditableMember = {
    displayName: string;
    dateOfBirth: string; // ISO date string
    city: string;
    country: string;
    gender: string;
    description?: string;
};
