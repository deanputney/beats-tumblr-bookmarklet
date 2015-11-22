#!/usr/bin/env python
import os
import urllib

source = open('bookmarklet.js', 'r').read()

# print source

urlencoded = "javascript:" + urllib.quote(source)

output = open('bookmarklet-encoded.js', 'w')

output.write(urlencoded)