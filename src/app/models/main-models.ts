export interface Book {
    url: string,
    name: string,
    isbn: string,
    authors: string[]
    numberOfPages: number,
    publisher: string,
    country: string,
    mediaType: string,
    released: string,
    characters: string
    povCharacters: string[],
};

export interface SignUp {
    name: string,
    username: string,
    password: string,
};

export interface Login {
    username: string,
    password: string,
};
