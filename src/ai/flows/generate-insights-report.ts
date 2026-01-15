'use server';

/**
 * @fileOverview Analyzes a dog's video or image and generates an insights report.
 *
 * - generateInsightsReport - A function that handles the analysis and report generation process.
 * - GenerateInsightsReportInput - The input type for the generateInsightsReport function.
 * - GenerateInsightsReportOutput - The return type for the generateInsightsReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsReportInputSchema = z.object({
  mediaUrl: z
    .string()
    .describe(
      "A media file of a dog, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  breed: z.string().describe('The breed of the dog.'),
  age: z.number().describe('The age of the dog in years.'),
});
export type GenerateInsightsReportInput = z.infer<typeof GenerateInsightsReportInputSchema>;

const GenerateInsightsReportOutputSchema = z.object({
  emotion: z.enum([
    'happy',
    'anxious',
    'fear',
    'aggressive',
    'pain',
    'neutral',
    'playful',
    'relaxed',
  ]).describe('The detected emotion of the dog.'),
  confidence: z.number().min(0).max(100).describe('The confidence level of the emotion detection (0-100).'),
  translation: z.string().describe('A human-readable translation of the dog\'s emotion.'),
  bodyLanguage: z.object({
    tail: z.string().describe("The position and movement of the dog's tail (e.g., high_wag, low, tucked)."),
    ears: z.string().describe("The position of the dog's ears (e.g., forward, flat, back)."),
    posture: z.string().describe("The dog's overall posture (e.g., relaxed, tense, crouched)."),
    eyes: z.string().describe("The appearance of the dog's eyes (e.g., soft, hard, whale_eye)."),
    mouth: z.string().describe("The state of the dog's mouth (e.g., relaxed, panting, lip_lick)."),
  }).describe('A breakdown of the dog\'s body language.'),
  health: z.object({
    gait: z.string().describe("The dog's gait analysis (e.g., normal, limping)."),
    eyes: z.string().describe("The clarity of the dog's eyes (e.g., clear, red, cloudy)."),
    breathing: z.string().describe("The dog's breathing rate (e.g., normal, heavy, labored)."),
    skin: z.string().describe("The condition of the dog's skin (e.g., healthy, irritated)."),
    urgency: z.enum(['green', 'yellow', 'red']).describe('An urgency meter indicating the severity of any health concerns.'),
  }).describe('A check of the dog\'s health and vital signs.'),
  tips: z.array(z.string()).describe('Actionable tips for the user based on the analysis.'),
});
export type GenerateInsightsReportOutput = z.infer<typeof GenerateInsightsReportOutputSchema>;

export async function generateInsightsReport(
  input: GenerateInsightsReportInput
): Promise<GenerateInsightsReportOutput> {
  return generateInsightsReportFlow(input);
}

const generateInsightsReportPrompt = ai.definePrompt({
  name: 'generateInsightsReportPrompt',
  input: {schema: GenerateInsightsReportInputSchema},
  output: {schema: GenerateInsightsReportOutputSchema},
  prompt: `You are a world-class veterinary behaviorist. Analyze the provided media of a dog with the following details: BREED: {{{breed}}}, AGE: {{{age}}}.

Media: {{media url=mediaUrl}}

Carefully observe the dog's body language (tail, ears, posture, eyes, mouth) and any vocalizations. Also, assess its general physical condition for any visible health indicators (gait, eye clarity, breathing, skin).

Based on your comprehensive analysis, provide a detailed report in the following JSON format. Ensure every field is filled out accurately.

- **emotion**: The primary emotion detected.
- **confidence**: Your confidence in the emotion detection, from 0 to 100.
- **translation**: A short, empathetic, human-readable translation of what the dog is likely feeling.
- **bodyLanguage**: Object detailing specific cues.
- **health**: Object detailing key health observations.
- **urgency**: A 'green', 'yellow', or 'red' rating. 'green' for no concerns, 'yellow' for something to monitor, 'red' for a recommendation to see a vet.
- **tips**: Provide 3-4 concise, actionable tips for the owner based on your findings.`,
});

const generateInsightsReportFlow = ai.defineFlow(
  {
    name: 'generateInsightsReportFlow',
    inputSchema: GenerateInsightsReportInputSchema,
    outputSchema: GenerateInsightsReportOutputSchema,
  },
  async input => {
    const {output} = await generateInsightsReportPrompt(input);
    if (!output) {
      throw new Error("Unable to generate insights report");
    }
    return output;
  }
);
