#!/usr/bin/env python
# coding: utf-8

import argparse
import math
import os
import pandas as pd
import codecs
import chardet
import time
import datetime
import cvthtml
from functools import reduce
import json

def process(input_path, readcnt, specialcharchg, encoding):
    _, file_type = os.path.splitext(input_path)
    if 'xls' in file_type:
        input_df = pd.read_excel(input_path)
    elif 'csv' in file_type or 'txt' in file_type:
        if encoding == "" :
            input_df = pd.read_csv(input_path)
        else:
            input_df = pd.read_csv(input_path, encoding=encoding)
    else:
        print('unknown format')

    cvthtml.chkdataframe(input_df,specialcharchg)
    
    input_read = input_df.head(readcnt)
    print('<datacount>')
    print('%d/%d'%(len(input_read),len(input_df)))
    print('<datainfos>')
    for c in input_df.columns:
        print('%s:%s'%(c, str(input_df[c].dtypes)))
    print('<datapreview>')
    print(input_read.to_csv(index=False))

def datainfo_analysis(input_path, encoding, chunksize):
    if encoding=="":
        fsize = os.path.getsize(input_path)
        bytecnt = min(32, fsize)
        raw = open(input_path, 'rb').read(bytecnt)
        result = chardet.detect(raw)
        encoding = result['encoding']

    info_input_path = input_path
    sp = input_path.rindex("/")
    info_input_path = input_path[:sp+1]+"."+input_path[sp+1:]+".info"
    
    if os.path.isfile(info_input_path):
        with open(info_input_path, "r") as file_info:
            colinfos = file_info.read()

        if not colinfos is None:
            print(colinfos)
            return

    
    start = time.time()
    tcnt = 0
    colstats = {}
    for cnt,input_df in enumerate(pd.read_csv(input_path, encoding=encoding, chunksize=chunksize)):
        if tcnt==0:
                for c in input_df.columns:
                    cinfo = {'column': c, 'type':str(input_df.dtypes[c])}
                    cinfo['types'] = [ cinfo['type'] ]
                    if cinfo['type']=='object':
#                        cinfo['maxlen'] = input_df.apply(lambda x: len(x[c]), axis=1).max()
                        pass
                    else:
#                        cinfo['max']=input_df[c].max(skipna=True,level=None,numeric_only=None)
#                        cinfo['min']=input_df[c].min(skipna=True,level=None,numeric_only=None)
                        cinfo['sum']=input_df[c].sum(skipna=True,level=None,numeric_only=None)
                        
#                    cinfo['maxlen'] = input_df.apply(lambda x: len(str(x[c])), axis=1).max()
                    cinfo['nullcnt']=input_df[c].isnull().sum()
                    cinfo['cnt']=input_df[c].count()
                    cinfo['value_counts']=input_df[c].value_counts() # count
                    cinfo['value_counts_cnt']=len(cinfo['value_counts'])
                    colstats[c] = cinfo
    #                print(cinfo)
        else:
                for c in input_df.columns:
                    cinfo = colstats[c]
                    
                    if not str(input_df.dtypes[c])==cinfo['type']:
    #                    print('changed type...', c, str(input_df.dtypes[c]), cinfo['type'])
                        cinfo['type'] = str(input_df.dtypes[c])
                        if not cinfo['type'] in cinfo['types']:
                            cinfo['types'].append(cinfo['type'])
                    if not cinfo is None:
                        #cinfo = colstats[cidx]

                        if cinfo['type']=='object':
                            #if cinfo['maxlen'] is None:
                            #    cinfo['maxlen'] = input_df.apply(lambda x: len(x[c]), axis=1).max()
#                            maxlen = input_df.apply(lambda x: len(str(x[c])), axis=1).max()
#                            if cinfo['maxlen'] < maxlen:
#                                cinfo['maxlen'] = maxlen
                            pass
                        else:
#                            maxv = input_df[c].max(skipna=True,level=None,numeric_only=None)
#                            minv = input_df[c].min(skipna=True,level=None,numeric_only=None)
#                            if cinfo['max']<maxv:
#                                cinfo['max'] = maxv
#                            if cinfo['min']>minv:
#                                cinfo['min'] = minv
                            cinfo['sum']+=input_df[c].sum(skipna=True,level=None,numeric_only=None)

                        cinfo['nullcnt']+=input_df[c].isnull().sum()
                        cinfo['cnt']+=input_df[c].count()
                        cinfo['value_counts']=cinfo['value_counts'].add(input_df[c].value_counts(), fill_value=0) # count
                        cinfo['value_counts_cnt']=len(cinfo['value_counts'])
                        colstats[c] = cinfo
#                    else:
#                        print('notfound')
        
        tcnt += len(input_df)
        #break
        
    dur = time.time() - start
    durstr = datetime.timedelta(seconds=dur)
#    print(durstr, tcnt)

#    np.set_printoptions(threshold=np.inf, linewidth=np.inf)
    colinfos = []
    for c in input_df.columns:
        cinfo = colstats[c]
        if not 'object' in cinfo['types']:
            avg = cinfo['sum'] / cinfo['cnt'] #평균
            colstats[c]['avg'] = avg #분산
            var = 0.0 #분산
            keys = cinfo['value_counts'].keys()
            colstats[c]['max'] = reduce(lambda x, y: y if x < y else x, keys)
            colstats[c]['min'] = reduce(lambda x, y: y if x > y else x, keys)
            vals = cinfo['value_counts'].values
            for i,k in enumerate(keys):
                var += math.pow(k-avg,2)*(vals[i])
            var = var / cinfo['cnt']
            colstats[c]['var'] = var
            #분산 구하가 colstats[c]['var'] = 
        else:
            keys = cinfo['value_counts'].keys()
            #colstats[c]['maxlen'] = reduce(lambda x, y: len(str(y)) if len(str(x))<len(str(y)) else len(str(x)), keys)
            keylens = list(map(lambda x:len(str(x)), keys))
            colstats[c]['maxlen'] = reduce(lambda x, y: y if x < y else x, keylens)
        
        cinfo['value_counts'].sort_index(inplace=True)
        if cinfo['value_counts_cnt']>=cinfo['cnt']:
            colstats[c]['value_counts'] = cinfo['value_counts'].head(10).to_csv() #.replace("\n","<br>")
        else:
            colstats[c]['value_counts'] = cinfo['value_counts'].to_csv() #.replace("\n","<br>")
        colinfos.append(colstats[c])

    print(colinfos)
    with open(info_input_path, "wt") as info_file:
        info_file.write(str(colinfos))

    #pd.DataFrame(colinfos).to_html(escape=False)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='argparser')
    # 명령을 위한 파서를 만듭니다
    parser.add_argument('-detailview', type=str, help='detailview(Y/N, default=N) help', default="N")
    parser.add_argument('-input_path', type=str, help='input path help', required=True)
    parser.add_argument('-readcnt', type=int, help='readcnt(default=200) path help', default=200)
    parser.add_argument('-specialcharchg', type=str, help='specialcharchg(default=_) path help', default='_')
    parser.add_argument('-encoding', type=str, help='encoding path help', default='')
    parser.add_argument('-chunksize', type=int, help='chunksize(default=20000) help', default=20000)
    args = parser.parse_args()
    input_path = args.input_path
    readcnt = args.readcnt
    specialcharchg = args.specialcharchg
    encoding = args.encoding
    chunksize = args.chunksize
    detailview = args.detailview
#    print(input_path, specialcharchg)
    if detailview=="Y" or detailview=="y":
        datainfo_analysis(input_path, encoding, chunksize)
    else:
        process(input_path, readcnt, specialcharchg, encoding)

