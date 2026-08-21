import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runChat, runCompletion } from "./ai.server";
import {
  CHAT_SYSTEM,
  EMAIL_SYSTEM,
  NOTES_SYSTEM,
  PLANNER_SYSTEM,
  RESEARCH_SYSTEM,
  emailPrompt,
  notesPrompt,
  plannerPrompt,
  researchPrompt,
} from "./prompts";

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        topic: z.string().min(1),
        tone: z.string(),
        audience: z.string(),
        length: z.string(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => runCompletion(EMAIL_SYSTEM, emailPrompt(data)));

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ notes: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => runCompletion(NOTES_SYSTEM, notesPrompt(data.notes)));

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({ tasks: z.string().min(1), hours: z.string(), focus: z.string() })
      .parse(input),
  )
  .handler(async ({ data }) => runCompletion(PLANNER_SYSTEM, plannerPrompt(data)));

export const runResearch = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ topic: z.string().min(1), depth: z.string() }).parse(input),
  )
  .handler(async ({ data }) => runCompletion(RESEARCH_SYSTEM, researchPrompt(data)));

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            }),
          )
          .min(1),
      })
      .parse(input),
  )
  .handler(async ({ data }) => runChat(CHAT_SYSTEM, data.messages));
