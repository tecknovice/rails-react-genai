import request from "@/lib/request";
import type { GenAIResponse } from "@/types/genai";

export function generateText(prompt: string) {
  return request<GenAIResponse>("POST", "/generate", {
    prompt,
  });
}
