from fastapi import FastAPI, HTTPException
import schemas
import os
import time

app = FastAPI(title="Kinematics Hub LLM Gateway")

# Mock LLM response for MVP
def mock_llm_call(prompt: str) -> str:
    time.sleep(1) # Simulate latency
    return f"This is a simulated AI response to: '{prompt}'. In a real implementation, this would call OpenAI/Anthropic."

@app.post("/qa", response_model=schemas.QueryResponse)
def question_answering(request: schemas.QueryRequest):
    # In real impl: 1. Embed query 2. Search vector DB 3. Call LLM with context
    answer = mock_llm_call(request.query)
    return schemas.QueryResponse(answer=answer, sources=["doc1", "doc2"])

@app.post("/summarize", response_model=schemas.SummarizeResponse)
def summarize(request: schemas.SummarizeRequest):
    summary = f"Summary of text ({len(request.text)} chars): " + mock_llm_call("Summarize this")
    return schemas.SummarizeResponse(summary=summary)

@app.get("/")
def read_root():
    return {"message": "LLM Gateway is running"}
