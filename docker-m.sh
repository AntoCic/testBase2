#!/bin/bash

DEFAULT_CONTAINER="mpp-tmp"

if [ "$1" == "-c" ]; then
    if [ -n "$2" ]; then
        sudo docker exec -it "$2" bash
    else
        sudo docker exec -it "$DEFAULT_CONTAINER" bash
    fi
else
    echo "Uso: $0 -c nome_container"
fi