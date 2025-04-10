type Communion ={
    group: string[];
}

export type Organizer = {
    name: string;
    email: string;
    password: string;
    communions: Communion[];
}