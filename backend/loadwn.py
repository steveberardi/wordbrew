import os
import wn

if os.environ.get("WN_DATA_PATH"):
    wn.config.data_directory = os.environ.get("WN_DATA_PATH")

wn.download('https://storage.googleapis.com/snappy-data/wn.xml.gz')
