'use server';

/**
 * @fileOverview AI assistant for answering questions about contact form submissions.
 *
 * - contactFormAssistant - A function that answers user questions using contact form submissions as context.
 * - ContactFormAssistantInput - The input type for the contactFormAssistant function.
 * - ContactFormAssistantOutput - The return type for the contactFormAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContactFormSubmissionSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  message: z.string().describe('The message content from the contact form.'),
});

export type ContactFormSubmission = z.infer<typeof ContactFormSubmissionSchema>;

const ContactFormAssistantInputSchema = z.object({
  question: z.string().describe('The user question to be answered.'),
  contactFormSubmissions: z
    .array(ContactFormSubmissionSchema)
    .describe('The list of contact form submissions to use as context.'),
});

export type ContactFormAssistantInput = z.infer<typeof ContactFormAssistantInputSchema>;

const ContactFormAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});

export type ContactFormAssistantOutput = z.infer<typeof ContactFormAssistantOutputSchema>;

export async function contactFormAssistant(input: ContactFormAssistantInput): Promise<ContactFormAssistantOutput> {
  return contactFormAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactFormAssistantPrompt',
  input: {schema: ContactFormAssistantInputSchema},
  output: {schema: ContactFormAssistantOutputSchema},
  prompt: `You are a helpful AI assistant answering questions about contact form submissions.

  Use the following contact form submissions as context to answer the question.

  Contact Form Submissions:
  {{#each contactFormSubmissions}}
  Name: {{{name}}}
  Email: {{{email}}}
  Message: {{{message}}}
  ---
  {{/each}}

  Question: {{{question}}}

  Answer:`,
});

const contactFormAssistantFlow = ai.defineFlow(
  {
    name: 'contactFormAssistantFlow',
    inputSchema: ContactFormAssistantInputSchema,
    outputSchema: ContactFormAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
