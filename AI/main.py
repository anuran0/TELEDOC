from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import spacy
from spacy.matcher import Matcher
import re
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Allows all origins, you can restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load environment variables
load_dotenv()

# Load the AI model
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")


# Function to load NLP model and matcher
def load_nlp_model():
    nlp = spacy.load("en_core_web_sm")
    matcher = Matcher(nlp.vocab)
    pattern1 = [
        {"LOWER": {"IN": ["have", "experiencing", "feeling", "suffering", "from"]}},
        {"POS": "DET", "OP": "?"},
        {"POS": "ADJ", "OP": "*"},
        {"POS": "NOUN"},
    ]
    pattern2 = [
        {"POS": "PRON", "OP": "?"},
        {"POS": "NOUN"},
        {"LEMMA": {"IN": ["hurt", "ache", "pain", "upset", "sore", "uncomfortable"]}},
    ]
    matcher.add("SYMPTOM", [pattern1, pattern2])
    return nlp, matcher


# Load Spacy NLP model and matcher
nlp, matcher = load_nlp_model()


# Pydantic model for request body
class SymptomsRequest(BaseModel):
    symptoms_description: str


def extract_symptoms(text):
    symptom_indicators = [
        r"experiencing",
        r"feeling",
        r"suffering from",
        r"have",
        r"has",
        r"complaining of",
        r"troubled by",
        r"bothered by",
    ]

    common_symptoms = [
        "Fever",
        "Cough",
        "Headache",
        "Fatigue",
        "Shortness of Breath",
        "Chest Pain",
        "Dizziness",
        "Nausea",
        "Abdominal Pain",
        "Joint Pain",
        "Rash",
        "Swollen Lymph Nodes",
        "Sore Throat",
        "Vomiting",
        "Diarrhea",
        "Constipation",
        "Back Pain",
        "Frequent Urination",
        "Night Sweats",
        "Blurred Vision",
        "Confusion",
        "Muscle Weakness",
        "Paleness",
        "Tingling or Numbness",
        "Excessive Thirst",
        "Hair Loss",
        "Heart Palpitations",
        "Loss of Appetite",
        "Difficulty Swallowing",
        "Dry Skin",
        "Hearing Loss",
        "Swollen Feet",
        "Yellowing of Skin",
        "Red Eyes",
        "Blood in Stool",
        "Blood in Urine",
        "Dry Mouth",
        "Chronic Cough",
        "Sudden Weight Gain",
        "Loss of Balance",
        "Cold Hands/Feet",
        "Nightmares",
        "Sleepiness During Daytime",
        "Leg Cramps",
        "Bloating",
        "Hot Flashes",
        "Persistent Hiccups",
        "Unexplained Bruising",
        "Itchy Skin",
    ]

    symptoms_pattern = r"(?i)\b(?:{})(?=\s|,|$)".format(
        "|".join(re.escape(symptom) for symptom in common_symptoms)
    )
    standalone_matches = re.findall(symptoms_pattern, text)
    symptoms = list(set(standalone_matches))
    return symptoms


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
        raise HTTPException(
            status_code=400, detail="No symptoms detected in the input."
        )
    diagnosis = get_ai_doctor_response(model, symptoms)
    return {"diagnosis": diagnosis}


@app.get("/")
async def root():
    return {
        "message": "Welcome to the AI Doctor Diagnosis API. Use the /diagnose endpoint to get a diagnosis."
    }
