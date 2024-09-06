#!/bin/bash

url="http://localhost:8122/api/one_time_automation/switch"
headers="Content-Type: application/json"
data='{
  "entityId": "switch.zhi_hui_cha_zuo_socket_1",
  "state": "off",
  "triggerTime": "17:26:00"
}'

res=$(curl -s -X POST "$url" -H "$headers" -d "$data")

if [ $? -eq 0 ]; then
    echo "Success: $res"
else
    echo "Failed: Error in the request"
fi
