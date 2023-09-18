FROM python:3
MAINTAINER DataCentric <dc@datacentric.kr>
RUN pip install jupyterlab

USER root
COPY jupyter_notebook_config.py /root/.jupyter/
RUN ["mkdir","-p","/work"]

WORKDIR /work
ENTRYPOINT jupyter lab --no-browser --ip=0.0.0.0 --port=8888 --allow-root --notebook-dir='/work'
