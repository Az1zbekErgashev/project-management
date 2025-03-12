# pull official base image
FROM node:18.18.1-buster

ARG REACT_APP_VERSION=0.0.0
ENV REACT_APP_VERSION ${REACT_APP_VERSION}

# Add Forticlient certificate
COPY ./docker/development/certs/Fortinet_CA_SSL.cer /usr/share/ca-certificates/
RUN grep -qxF 'Fortinet_CA_SSL.cer' /etc/ca-certificates.conf || echo 'Fortinet_CA_SSL.cer' >> /etc/ca-certificates.conf && \
    update-ca-certificates

RUN apt-get update && \
    apt-get -y install supervisor dos2unix

# set working directory
WORKDIR /app

COPY ./docker/development/start-container /usr/local/bin/start-container
RUN dos2unix /usr/local/bin/start-container
COPY ./docker/development/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod +x /usr/local/bin/start-container

EXPOSE 3000

ENTRYPOINT ["start-container"]
