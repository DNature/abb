import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  CreateListingMutation,
  CreateListingMutationVariables
} from "src/__generated__/CreateListingMutation";

export const createListingMutation = gql`
  mutation CreateListingMutation(
    $name: String!
    $category: String!
    $description: String!
    $price: Int!
    $beds: Int!
    $guests: Int!
    $latitude: Float!
    $longitude: Float!
    $amenities: [String!]!
  ) {
    createListing(
      input: {
        name: $name
        category: $category
        description: $description
        price: $price
        beds: $beds
        guests: $guests
        latitude: $latitude
        longitude: $longitude
        amenities: $amenities
      }
    )
  }
`;

export interface NewPropsCreateListing {
  createListing: (variables: CreateListingMutationVariables) => void;
}
export const withCreatelisting = graphql<
  any,
  CreateListingMutation,
  CreateListingMutationVariables,
  NewPropsCreateListing
>(createListingMutation, {
  props: ({ mutate }) => ({
    createListing: async (variables: CreateListingMutationVariables) => {
      if (!mutate) {
        return;
      }

      const response = await mutate({ variables });
      console.log(response);
    }
  })
});