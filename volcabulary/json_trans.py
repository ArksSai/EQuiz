import re
import pandas as pd

f = open('./7000.csv', encoding='utf-8')
txt = f.read()
f.close()
txt = re.sub('@\([a-z]*\.[0-9]*\)', '@', txt)

f = open('./7000_df.csv', 'w', encoding='utf-8')
f.write(txt)
f.close()
#Then, add "Volcabulary, Meaning" in top of 7000_df.csv


df = pd.read_csv('./7000_df.csv', sep='@')
df_r = pd.DataFrame(columns=['Volcabulary', 'Meaning'])
s = set()

for i in range(len(df)):
    v = df.loc[i, 'Volcabulary']
    m = df.loc[i, 'Meaning']
    if v in s:
        df_r.loc[df_r['Volcabulary'] == v, 'Meaning'] += ' ; ' + m
    else:
        df_r = df_r.append(df.iloc[i])
    s.add(v)

df_r = df_r.set_index('Volcabulary')
df_r.to_json('./7000.json', orient='index')
