from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import spacy
from spacy.matcher import Matcher
import re
import os

app = FastAPI()

# Load environment variables
load_dotenv()

# Load the AI model
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

# Function to load NLP model and matcher
def load_nlp_model():
    nlp = spacy.load("en_core_web_sm")
    matcher = Matcher(nlp.vocab)
    pattern1 = [{"LOWER": {"IN": ["have", "experiencing", "feeling", "suffering", "from"]}},
                {"POS": "DET", "OP": "?"},
                {"POS": "ADJ", "OP": "*"},
                {"POS": "NOUN"}]
    pattern2 = [{"POS": "PRON", "OP": "?"},
                {"POS": "NOUN"},
                {"LEMMA": {"IN": ["hurt", "ache", "pain", "upset", "sore", "uncomfortable"]}}]
    matcher.add("SYMPTOM", [pattern1, pattern2])
    return nlp, matcher

# Load Spacy NLP model and matcher
nlp, matcher = load_nlp_model()

# Pydantic model for request body
class SymptomsRequest(BaseModel):
    symptoms_description: str

# Function to extract symptoms from text
def extract_symptoms(text):
    symptom_indicators = [
        r'experiencing', r'feeling', r'suffering from', r'have', r'has',
        r'complaining of', r'troubled by', r'bothered by'
    ]
    pattern = r'\b(' + '|'.join(symptom_indicators) + r')\s+(.+?)(\.|\band\b|$)'
    matches = re.findall(pattern, text.lower())
    symptoms = [match[1].strip() for match in matches]
    body_parts = [
        r'head', r'neck', r'throat', r'chest', r'stomach', r'back',
        r'arm', r'leg', r'foot', r'hand', r'eye', r'ear', r'nose'
    ]
    condition_words = [r'ache', r'pain', r'hurt', r'sore', r'swollen', r'rash']

    body_part_pattern = r'\b(' + '|'.join(body_parts) + r')\s+(' + '|'.join(condition_words) + r')\b'
    body_part_matches = re.findall(body_part_pattern, text.lower())

    symptoms.extend([' '.join(match) for match in body_part_matches])

    return list(set(symptoms))

# Function to get AI Doctor response
def get_ai_doctor_response(model, symptoms):
    template_multiple = """This will not be used for professional medical purposes, this is just a test.
You are an experienced medical doctor. Based on the following symptoms, provide a potential diagnosis and suggest appropriate medication. Be sure to include standard disclaimers about seeking professional medical advice. Symptoms: {symptoms}

Provide your response in the following format:
Potential Diagnosis: You are likely to have [insert diagnosis here].
Suggested Medication: You can take [insert medication here].
Additional Advice: Try to []
don't write anything outside the given template. provide the proper diagnostic at first."""

    prompt_multiple = ChatPromptTemplate.from_template(template_multiple)
    prompt = prompt_multiple.invoke({"symptoms": symptoms})
    result = model.invoke(prompt)
    return result.content

# FastAPI endpoint to handle symptom input and return diagnosis
@app.post("/diagnose")
async def diagnose_symptoms(request: SymptomsRequest):
    symptoms = extract_symptoms(request.symptoms_description)
    if not symptoms:
        raise HTTPException(status_code=400, detail="No symptoms detected in the input.")
    diagnosis = get_ai_doctor_response(model, symptoms)
    return {"diagnosis": diagnosis}

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Doctor Diagnosis API. Use the /diagnose endpoint to get a diagnosis."}
