var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
import { graphql } from "react-apollo";
var createListingMutation = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateListingMutation(\n    $name: String!\n    $category: String!\n    $description: String!\n    $price: Int!\n    $beds: Int!\n    $guests: Int!\n    $latitude: Float!\n    $longitude: Float!\n    $amenities: [String!]!\n  ) {\n    createListing(\n      input: {\n        name: $name\n        category: $category\n        description: $description\n        price: $price\n        beds: $beds\n        guests: $guests\n        latitude: $latitude\n        longitude: $longitude\n        amenities: $amenities\n      }\n    )\n  }\n"], ["\n  mutation CreateListingMutation(\n    $name: String!\n    $category: String!\n    $description: String!\n    $price: Int!\n    $beds: Int!\n    $guests: Int!\n    $latitude: Float!\n    $longitude: Float!\n    $amenities: [String!]!\n  ) {\n    createListing(\n      input: {\n        name: $name\n        category: $category\n        description: $description\n        price: $price\n        beds: $beds\n        guests: $guests\n        latitude: $latitude\n        longitude: $longitude\n        amenities: $amenities\n      }\n    )\n  }\n"])));
export var withCreatelisting = graphql(createListingMutation, {
    props: function (_a) {
        var mutate = _a.mutate;
        return ({
            createListing: function (variables) {
                if (!mutate) {
                    return;
                }
                mutate({ variables: variables });
            }
        });
    }
});
var templateObject_1;
//# sourceMappingURL=index.js.map