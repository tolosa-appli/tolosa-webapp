// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Generates ice-breaker conversation starters for forum discussions.
 *
 * - generateDiscussionStarter - A function that generates discussion starters.
 * - GenerateDiscussionStarterInput - The input type for the generateDiscussionStarter function.
 * - GenerateDiscussionStarterOutput - The return type for the generateDiscussionStarter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDiscussionStarterInputSchema = z.object({
  topic: z.string().describe('The topic of the forum discussion.'),
});

export type GenerateDiscussionStarterInput = z.infer<
  typeof GenerateDiscussionStarterInputSchema
>;

const GenerateDiscussionStarterOutputSchema = z.object({
  starter: z.string().describe('An ice-breaker conversation starter.'),
});

export type GenerateDiscussionStarterOutput = z.infer<
  typeof GenerateDiscussionStarterOutputSchema
>;

export async function generateDiscussionStarter(
  input: GenerateDiscussionStarterInput
): Promise<GenerateDiscussionStarterOutput> {
  return generateDiscussionStarterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDiscussionStarterPrompt',
  input: {schema: GenerateDiscussionStarterInputSchema},
  output: {schema: GenerateDiscussionStarterOutputSchema},
  prompt: `You are a helpful assistant that suggests ice-breaker conversation starters for forum discussions.

  Topic: {{{topic}}}

  Please provide an engaging and relevant conversation starter related to the topic. The starter should be concise and encourage participation from other users. The response should be in French.`,
});

const generateDiscussionStarterFlow = ai.defineFlow(
  {
    name: 'generateDiscussionStarterFlow',
    inputSchema: GenerateDiscussionStarterInputSchema,
    outputSchema: GenerateDiscussionStarterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
