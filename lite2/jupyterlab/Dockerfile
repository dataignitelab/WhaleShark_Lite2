FROM python:3
MAINTAINER DataCentric <dc@datacentric.kr>
RUN pip install jupyterlab
COPY jupyter_notebook_config.py /root/.jupyter/
ENTRYPOINT jupyter lab --no-browser --ip=0.0.0.0 --user root --port=8888 --allow-root --notebook-dir='/work'
