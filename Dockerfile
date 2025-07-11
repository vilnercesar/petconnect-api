FROM python:3.12-slim
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /code/app
COPY ./create_admin.py /code/create_admin.py
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]