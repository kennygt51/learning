import pandas as pd
import numpy as np

df = pd.DataFrame({ 'A' : 1.,
                        'B' : pd.Timestamp('20130102'),
                        'C' : pd.Series(1,index=list(range(4)),dtype='float32'),
                        'D' : np.array([3] * 4,dtype='int32'),
                        'E' : np.array([4] * 4,dtype='int32'),
                        'F' : pd.Categorical(["test","train","test","train"]),
                        'G' : 'foo' })

### 複数の列の文字列を結合し新しい列を生成する
# 列同士を結合して、新しい列を挿入する
df['D-E'] = df['D'].astype(str) + df['E'].astype(str)
# 不要な列を削除する
df.drop(['D', 'E'], axis=1, inplace=True)

print(df)


df2 = pd.DataFrame(
    {'A': ['1:Danny', '2:Jess', '3:Joey', '4:D.J.', '5:Steph', '6:Michelle', '7:Comet'],
     'B': [1, 4, 3, 4, 4, 4 , 5],
     'C': [1, 1, 1, 2, 4, 3 , 5]})

print(df2.sort_values(by=['B', 'C'], ascending=[True,True]))
