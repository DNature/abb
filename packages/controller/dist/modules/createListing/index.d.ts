/// <reference types="react" />
import { CreateListingMutationVariables } from "src/__generated__/CreateListingMutation";
export declare const createListingMutation: import("graphql").DocumentNode;
export interface WithCreateListing {
    createListing: (variables: CreateListingMutationVariables) => void;
}
export declare const withCreateListing: (WrappedComponent: import("react").ComponentType<any>) => import("react").ComponentClass<any, any>;
