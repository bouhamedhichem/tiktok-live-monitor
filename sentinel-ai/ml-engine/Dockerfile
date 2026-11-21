FROM python:3.12-slim
WORKDIR /app
RUN pip install --no-cache-dir fastapi==0.115.12 'uvicorn[standard]==0.34.2' scikit-learn==1.6.1 numpy==2.2.5 joblib==1.5.0
COPY service.py .
RUN mkdir -p /app/models
EXPOSE 8001
CMD ["uvicorn","service:app","--host","0.0.0.0","--port","8001"]
