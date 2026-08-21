import { streamText, type ModelMessage } from "ai";
import { getModel } from "./ai-gateway.server";

function friendlyError(error: unknown): never {
  const status = (error as { statusCode?: number; status?: number })?.statusCode ??
    (error as { status?: number })?.status;
  if (status === 429) {
    throw new Error("The AI service is rate limited right now. Please try again in a moment.");
  }
  if (status === 402) {
    throw new Error("AI credits have run out for this workspace. Add credits to continue.");
  }
  if (status === 403) {
    throw new Error("AI access is blocked for this workspace. Check your workspace AI settings.");
  }
  throw new Error(
    error instanceof Error ? error.message : "The AI request failed. Please try again.",
  );
}

export async function runCompletion(system: string, prompt: string) {
  try {
    const result = streamText({ model: getModel(), system, prompt });
    return { text: await result.text };
  } catch (error) {
    friendlyError(error);
  }
}

export async function runChat(system: string, messages: ModelMessage[]) {
  try {
    const result = streamText({ model: getModel(), system, messages });
    return { text: await result.text };
  } catch (error) {
    friendlyError(error);
  }
}
