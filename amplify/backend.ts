import { defineBackend } from "@aws-amplify/backend";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { myDynamoDBFunction } from "./functions/dynamoDB-function/resource";

const backend = defineBackend({
  auth,
  data,
  myDynamoDBFunction,
});

const eventSource = new DynamoEventSource(backend.data.resources.tables["Todo"], {
  startingPosition: StartingPosition.LATEST,
});

backend.myDynamoDBFunction.resources.lambda.addEventSource(eventSource);