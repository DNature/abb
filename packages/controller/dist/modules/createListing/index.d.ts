/// <reference types="react" />
import { CreateListingMutationVariables } from "src/__generated__/CreateListingMutation";
export declare const createListingMutation: import("graphql").DocumentNode;
export interface NewPropsCreateListing {
    createListing: (variables: CreateListingMutationVariables) => void;
}
export declare const withCreatelisting: (WrappedComponent: import("react").ComponentType<any>) => import("react").ComponentClass<any, any>;
