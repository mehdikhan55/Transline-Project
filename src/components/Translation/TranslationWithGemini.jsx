import React, { useState, useEffect } from 'react'
import Selections from './Selections'
import TranslationBox from './TranslationBox'
import { GoogleGenAI } from '@google/genai';

export default function TranslationWithGemini() {
  const [outputLanguage, setOutputLanguage] = useState('uk english');
  const [inputLanguage, setInputLanguage] = useState('uk english');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [documentType, setDocumentType] = useState("standard");
  const [docTypeByUser, setDocTypeByUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const translate = async () => {
    let text
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_GEMINI_KEY;
      if (!apiKey) {
        alert("Please set VITE_GEMINI_KEY in your .env file");
        setLoading(false);
        return;
      }

      if (documentType === 'standard') {
        text = `You are a ${inputLanguage} to ${outputLanguage}  translator. This document is a ${docTypeByUser}. Translate the following text accurately and give output in the exact same format as i gave you, this is the text you have to translate: ${inputText}`
      } else if (documentType === 'medical') {
        text = `You are a ${inputLanguage} to ${outputLanguage} medical translator. Translate the following text accurately and give output in the exact same format as i gave you, this is the text you have to translate: ${inputText}`
      }

      if (inputText.length === 0 || inputText === "" || inputText === null) {
        alert("Please enter some text to translate")
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
      });

      const translatedContent = response.text;

      if (translatedContent) {
        setOutputText(translatedContent);
      } else {
        // Handle empty or invalid response
        setError(true);
        setTimeout(() => {
          setError(false)
        }, 2500);
      }
    } catch (error) {
      console.error("Translation error:", error);
      // Handle errors
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 2500);
    } finally {
      setLoading(false);
    }
    console.log("translate ended")
  };






  return (
    <section className='tranlation_section'>

      <Selections
        inputLanguage={inputLanguage}
        setInputLanguage={setInputLanguage}
        outputLanguage={outputLanguage}
        setOutputLanguage={setOutputLanguage}
        showGPTVersion={false}
        loading={loading}
        setLoading={setLoading}
        translate={translate}
        documentType={documentType}
        setDocumentType={setDocumentType}
        docTypeByUser={docTypeByUser}
        setDocTypeByUser={setDocTypeByUser}
        error={error}
      />

      <TranslationBox
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
        inputText={inputText}
        setInputText={setInputText}
        outputText={outputText}
        setOutputText={setOutputText}
        loading={loading}
        setLoading={setLoading}
        error={error}

      />

    </section>
  )
}
