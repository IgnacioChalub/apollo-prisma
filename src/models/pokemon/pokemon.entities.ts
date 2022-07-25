export class Pokemon {
    id: string;
    name: string;
    is_legendary: boolean;
    is_mythical: boolean;
    capture_rate: number;
    habitat: Habitat;
    is_baby: boolean;
    sprites: Sprites;   
}

class Habitat {
    name: string;
}

export class Images {
    id: string;
    name: string;
    sprites: Sprites
} 

export class Sprites {

    back_default: string;
    front_default: string;

    constructor(back_default: string, front_default: string) {
        this.back_default = back_default;
        this.front_default = front_default;
    } 

}

export class Item {
    id: string;
    name: string;
    cost: number;
    fling_power: number;
    sprites: ItemSprite;
}

class ItemSprite {
    defalut: string;
}

export class PokemonIdentifiers {
    name: string;
    id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    } 
}

export class ItemIdentifiers {
    name: string;
    id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    } 
}


export class Location {
    name: String

}

export class RegionName {
    name: string;
}

export class LocationName {
    name: string;
    areas: string[]
}