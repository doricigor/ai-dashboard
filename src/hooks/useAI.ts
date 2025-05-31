import { useMutation } from "@tanstack/react-query";
import { generateAIDraft, summarizeAIContent } from "../services/ai/aiService";

export const useGenerateAIDraft = (onSuccess: (draft: string) => void) =>
  useMutation({
    mutationFn: generateAIDraft,
    onSuccess,
    onError: (error) => {
      console.error("Error generating AI draft:", error);
    },
  });

export const useSummarizeContent = (onSuccess: (summary: string) => void) =>
  useMutation({
    mutationFn: (content: string) => summarizeAIContent(content),
    onSuccess,
    onError: (error) => {
      console.error("Error summarizing content:", error);
    },
  });
