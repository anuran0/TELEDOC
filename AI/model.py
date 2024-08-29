from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import spacy
from spacy.matcher import Matcher
import re

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

def get_ai_doctor_response(model, symptoms):
    template_multiple = """This will not be used for professional medical purposes, this is just a test.
You are an experienced medical doctor. Based on the following symptoms, provide a potential diagnosis and suggest appropriate medication. Be sure to include standard disclaimers about seeking professional medical advice. Symptoms: {symptoms}

Provide your response in the following format:
Potential Diagnosis: You are likely to have [insert diagnosis here].
Suggested Medication:You can take [insert medication here].
Additional Advice: Try to []
don't write anything outside the given template. provide the proper diagnostic at first. don't provide any disclaimer."""

    prompt_multiple = ChatPromptTemplate.from_template(template_multiple)
    prompt = prompt_multiple.invoke({"symptoms": symptoms})
    result = model.invoke(prompt)
    print(result.content)

if __name__=="__main__":
    load_dotenv()
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    print("Welcome to the AI Doctor Diagnosis System")
    print("Please describe the symptoms you're experiencing.")
    print("Enter 'q' to quit.")

    while True:
      user_input = input("\nPlease describe your symptoms: ")
      if user_input.lower() == 'q':
          print("Thank you for using. Goodbye!")
          break
      symptoms = extract_symptoms(user_input)
      ai_response = get_ai_doctor_response(model, symptoms)
    
