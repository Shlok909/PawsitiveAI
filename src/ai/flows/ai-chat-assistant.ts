'use server';

/**
 * @fileOverview AI chat assistant that remembers previous analysis reports and can answer user questions about their dog's health and behavior.
 *
 * - aiChatAssistant - A function that handles the AI chat assistant process.
 * - AIChatAssistantInput - The input type for the aiChatAssistant function.
 * - AIChatAssistantOutput - The return type for the aiChatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistantInputSchema = z.object({
  question: z.string().describe('The user question about their dog.'),
  previousAnalysis: z.string().optional().describe('The previous analysis report in text format.'),
});
export type AIChatAssistantInput = z.infer<typeof AIChatAssistantInputSchema>;

const AIChatAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type AIChatAssistantOutput = z.infer<typeof AIChatAssistantOutputSchema>;

export async function aiChatAssistant(input: AIChatAssistantInput): Promise<AIChatAssistantOutput> {
  return aiChatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are a helpful AI assistant that provides advice about dog health and behavior.

  You have access to the following information:
  - Previous analysis report: {{previousAnalysis}}
  - User question: {{question}}

  Based on this information, answer the user's question in a clear and concise way.
  If you don't have enough information, ask for more details.
`,
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
