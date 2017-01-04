#!/bin/bash
set -e

PROJECT_NAME=$1

rm -rf $PROJECT_NAME
mkdir $PROJECT_NAME
tar xvzf $PROJECT_NAME.tgz --directory $PROJECT_NAME

sudo tee /etc/systemd/system/$PROJECT_NAME.service << EOF
[Unit]
Description=Docker Compose managed application
After=docker.service
Requires=docker.service
[Service]
WorkingDirectory=/root/$PROJECT_NAME
ExecStartPre=-/opt/bin/docker-compose down
ExecStart=/opt/bin/docker-compose up -d --build
ExecStop=/opt/bin/docker-compose stop
[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable $PROJECT_NAME.service
sudo systemctl restart $PROJECT_NAME.service