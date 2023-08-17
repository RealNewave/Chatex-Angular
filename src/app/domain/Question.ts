import {Answer} from "./Answer";
import {ZonedDateTime} from "@js-joda/core";
import {Responder} from "./Responder";

export type Question = {
  id: string;
  starter: string
  question: string
  answers: Answer[]
  responders: Responder[]
  timestamp: ZonedDateTime,
  updated: ZonedDateTime,
  answered: boolean,
  openToPublic: boolean
}
