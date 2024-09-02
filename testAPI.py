import requests

# url = 'http://localhost:8122/api/turn_gate'
# url = 'http://localhost:8122/api/history_data'
# url = 'http://localhost:8122/api/sensor'
# url = 'http://localhost:8122/api/conversation'
url = 'http://localhost:8122/api/one_time_automation/switch'
headers = {
	'Content-Type': 'application/json'
}
data = {
	# 'chatText': 'turn on the light'

	"entityId": "switch.zhi_hui_cha_zuo_socket_1",
	"state": "off",
	"triggerTime": "17:26:00"

	# 'state': 'on',
	# 'entity_id': 'switch.zhi_hui_cha_zuo_socket_1'
	# 'state': 'off'
}

try:
	#測試POST
	response = requests.post(url, headers=headers, json=data)
	# 測試GET
	# response = requests.get(url)
	response.raise_for_status()  # 如果狀態碼不是 200，則引發 HTTPError
	print('Success:', response.json())
except requests.exceptions.RequestException as e:
	print('Failed:', e)