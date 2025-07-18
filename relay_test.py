import time
from relay_lib import *

relay_all_on()
time.sleep(1)
relay_all_off()
time.sleep(1)

while True:
  for i in range(1, 5):
    relay_on(i)
    time.sleep(1)
    relay_off(i)