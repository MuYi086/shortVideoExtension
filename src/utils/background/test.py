
import json
import random
import math
import quote
concat_order = ["captchaSn", "bgDisWidth", "bgDisHeight", "cutDisWidth", "cutDisHeight",
                    "relativeX", "relativeY", "trajectory", "gpuInfo", "captchaExtraParam"]
n = {
    "captchaSn": 3,
    "bgDisWidth": 2,
    "bgDisHeight": 1
}
quote(str(n[k]), safe='') for k in concat_order
print(concat_order)