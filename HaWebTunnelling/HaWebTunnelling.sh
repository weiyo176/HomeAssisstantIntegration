#!/bin/bash

# this script is used for port forwarding the HA web from this private ip only host to a host have public ip

# Check if any process contains "homeassistant.local"
if ps aux | grep -v grep | grep -q "homeassistant.local"; then
    echo "ssh tunnelling process is running" >> ~/.ssh/HaWebTunnelling/result.txt
else
    echo "No ssh tunnelling process found" >> ~/.ssh/HaWebTunnelling/result.txt
    ssh -fNR 0.0.0.0:8123:homeassistant.local:8123 tommygood@163.22.17.184
fi



