export class Pokemon {
    id: string;
    name: string;
    is_legendary: boolean;
    is_mythical: boolean;
    capture_rate: number;
    habitat: Habitat;
    is_baby: boolean;
}

class Habitat {
    name: string;
}

export class Images {
    id: string;
    name: string;
    sprites: Sprites
} 

class Sprites {
    back_default: string;
    front_default: string;
}


