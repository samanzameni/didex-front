import json
import io

with io.open('./countries.json', encoding='utf-8') as c:
  countries = json.load(c)

  no_phone = []
  bad_phone = []
  for country in countries:
    if country['phoneCode'] == '':
      no_phone.append(country['name'])
    elif country['phoneCode'][0] == '+':
      bad_phone.append(country['name'])

  print(no_phone)
  print('----------')
  print(bad_phone)
