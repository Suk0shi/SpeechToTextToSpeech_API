"use client";

import React from 'react';
import { useState } from 'react'

function Translator() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [text, setText] = useState<string>();
    const [output, setOutput] = useState<string>();
  
    function handleOnRecord() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.onresult = async function(event) {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            const response = await fetch('/api/translate', {
                method: 'POST',
                body: JSON.stringify({
                    text: transcript,
                    person: 'Jar Jar Binks',
                    emotion: 'angry'
                })
            }).then(r => r.json());
            setOutput(response.text);
        }
        
        recognition.start();
    }

    return (
      <>
        <button onClick={ handleOnRecord }>
            { isActive ? 'Stop' : 'Record' }
        </button>
        <p>Input: {text}</p>
        <p>Output: {output}</p>
      </>
    )
  }
  
  export default Translator