import { apiClient } from "../apiService";

export const generateAIDraft = async (prompt: string): Promise<string> => {
  if (import.meta.env.DEV) {
    return Promise.resolve(
      "This is a mocked AI-generated draft based on your prompt."
    );
  }

  const { data } = await apiClient.post("/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return data.choices[0].message.content;
};

export const summarizeAIContent = async (content: string): Promise<string> => {
  const summaryPrompt = `Summarize the following content:\n\n${content}`;
  return generateAIDraft(summaryPrompt);
};
