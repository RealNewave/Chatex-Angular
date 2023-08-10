import {Answer} from "./Answer";
import {ZonedDateTime} from "@js-joda/core";

export type Question = {
  id: string;
  starter: string
  question: string
  answers: Answer[]
  timestamp: ZonedDateTime,
  updated: ZonedDateTime
}
