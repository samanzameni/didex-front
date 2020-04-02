import json
import io

with io.open('./flag.json', encoding='utf-8') as f:
  flags = json.load(f)

  with io.open('./phone.json', encoding='utf-8') as ph:
    phones = json.load(ph)

    for country in flags:
      code = country['code']
      if code in phones.keys():
        country['phoneCode'] = phones[country['code']]
      else:
        country['phoneCode'] = ""

    result_string = json.dumps(flags, indent=2, sort_keys=True).encode('utf-8').decode("raw_unicode_escape").encode('utf-16', 'surrogatepass').decode('utf-16')
    with io.open('./countries.json', 'w', encoding='utf-8') as result:
      result.write(result_string)  



      