'use server';

/**
 * @fileOverview Translates the detected dog emotion into a human-readable message.
 *
 * - translateDogEmotion - A function that translates the dog's emotion.
 * - TranslateDogEmotionInput - The input type for the translateDogEmotion function.
 * - TranslateDogEmotionOutput - The return type for the translateDogEmotion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateDogEmotionInputSchema = z.object({
  emotion: z
    .string()
    .describe("The dog's emotion (happy, anxious, fear, aggressive, pain, or neutral)."),
  confidence: z.number().describe('The confidence level of the detected emotion (0-100).'),
  breed: z.string().optional().describe('The breed of the dog.'),
  age: z.number().optional().describe('The age of the dog in years.'),
});
export type TranslateDogEmotionInput = z.infer<typeof TranslateDogEmotionInputSchema>;

const TranslateDogEmotionOutputSchema = z.object({
  translation: z.string().describe('A human-readable message that translates the dog emotion.'),
});
export type TranslateDogEmotionOutput = z.infer<typeof TranslateDogEmotionOutputSchema>;

export async function translateDogEmotion(input: TranslateDogEmotionInput): Promise<TranslateDogEmotionOutput> {
  return translateDogEmotionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateDogEmotionPrompt',
  input: {schema: TranslateDogEmotionInputSchema},
  output: {schema: TranslateDogEmotionOutputSchema},
  prompt: `You are a veterinary behaviorist. You will translate the detected dog emotion into a human-readable message.

  Emotion: {{{emotion}}}
  Confidence: {{{confidence}}}
  Breed: {{#if breed}}{{{breed}}}{{else}}Unknown{{/if}}
  Age: {{#if age}}{{{age}}} years{{else}}Unknown{{/if}}

  Translation:`,
});

const translateDogEmotionFlow = ai.defineFlow(
  {
    name: 'translateDogEmotionFlow',
    inputSchema: TranslateDogEmotionInputSchema,
    outputSchema: TranslateDogEmotionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
