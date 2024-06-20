import { NextResponse } from 'next/server';

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export async function POST(request: Request) {
    const { text, person, emotion } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          "role": "system",
          "content": `
            You will be provided with a sentence. Your tasks are to: 
            - respond to the sentence as if you are ${person}
            - your response should represent this person showing the emotion of ${emotion}
            Do not return anything other than the response to the sentence`
        },
        {
          "role": "user",
          "content": text
        }
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    return NextResponse.json({
      text: response.choices[0].message.content
    });
}