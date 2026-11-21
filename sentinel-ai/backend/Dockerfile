FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
RUN pip install --no-cache-dir fastapi==0.115.12 'uvicorn[standard]==0.34.2' sqlalchemy==2.0.40 'psycopg[binary]==3.2.9' pydantic-settings==2.9.1 'python-jose[cryptography]==3.4.0' 'passlib[argon2]==1.7.4' email-validator==2.2.0
COPY app.py .
EXPOSE 8000
CMD ["uvicorn","app:app","--host","0.0.0.0","--port","8000"]
