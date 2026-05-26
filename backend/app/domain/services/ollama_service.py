import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_subtasks(task_title: str):
    prompt = f"""
Eres un asistente de descomposición de tareas.

Dado un título de tarea, divide la tarea en subtareas pequeñas y acciones concretas.

Reglas:
- return ONLY JSON array of strings
- max 5 items
- sin explicaciones, solo la lista de subtareas
- en español
- cada elemento debe ser un objeto con:
 - "title" : string
 - "description": string (description indicara el tiempo estimado realista para completar la subtarea, en minutos u horas según corresponda)

 REGLA CRÍTICA DE TIEMPO:
- la suma total de tiempos de las subtareas NO puede superar el tiempo lógico de la tarea original
- mantén coherencia: si la tarea es pequeña, subtareas deben ser pequeñas
- si la tarea es grande, distribuye el tiempo de forma proporcional
- evita subtareas más grandes que la tarea original


Task: {task_title}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()

    try:
        return json.loads(data["response"])
    except:
        return []