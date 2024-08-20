import requests

url = 'http://localhost:8122/api/turn_gate'
# url = 'http://localhost:8122/api/history_data'
# url = 'http://localhost:8122/api/sensor'
headers = {
	'Content-Type': 'application/json'
}
data = {
	'state': 'on'
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