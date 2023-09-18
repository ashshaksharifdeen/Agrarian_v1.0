FROM python:3.8-alpine
COPY . /app
WORKDIR /app
FROM ubuntu:latest
RUN apt-get update && apt-get install --yes --no-install-recommends \
    libgl1 \
    libgomp1 \
    python3-pip
RUN python3 -m pip install --no-cache-dir --upgrade pip && \
    python3 -m pip install --no-cache-dir --upgrade open3d
RUN python3 -m pip install --upgrade open3d
RUN pip install -r requirements.txt
CMD python src/pointcloud/pointcloud.py

