import { apiRequest } from "./queryClient";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequestOptions {
  message: string;
  history?: ChatMessage[];
}

export const sendChatMessage = async (options: ChatRequestOptions): Promise<string> => {
  try {
    const response = await apiRequest("POST", "/api/chat", options);
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};
