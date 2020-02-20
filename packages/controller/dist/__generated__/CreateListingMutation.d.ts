export interface CreateListingMutation {
    createListing: boolean;
}
export interface CreateListingMutationVariables {
    name: string;
    category: string;
    description: string;
    price: number;
    beds: number;
    guests: number;
    latitude: number;
    longitude: number;
    amenities: string[];
}
