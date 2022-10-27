const axios = require('axios')
const Util = require('./src/utils/Util')
const fingerJson = require('./src/utils/json/fingerprint.json')
const currentFingerprint = randomGetOneFingerprint(fingerJson)

// 随机获取一个fingerprint
function randomGetOneFingerprint (json) {
  const len = json.length
  const index = Util.getRandomInt(0, len)
  return json[index]
}

const headers = {
  'Connection': 'keep-alive',
  'User-Agent': currentFingerprint[0]['info'],
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Origin': 'http://m.gifshow.com',
  'Referer': 'https://www.kuaishou.com/short-video/3xvkkm9xr9rakni',
  'Accept-Language': 'zh-CN,zh;q=0.9',
}
const captchaApiUrl = 'https://captcha.zt.kuaishou.com/rest/zt/captcha/sliding/kSecretApiVerify'
    const paraJson = {
      "verifyParam": "3sCt3iAAAAAAAAAAAAAAAwEQBjoIdCECAmjahIMRAABEDYcfnH++Zl0UHFi8w4KsylFni3n/IM0Nj1pHvm3+sw+DQumdssd8SqNHdtnopHaM0seWILaXlT6UQ8utprvAkolNmnVAPoS5gU5XRLJ2Sp2coJipuqaA2Jb6gHgW6K662w6UsZgEvIICOqLsvnebVQEPh6ethapfcsS2/MWOjb/0mXyBdeO5J4nDl6NGvm7wRI+xWo43jrcpkHxyWp2NWLXpp442uqIEZufXKHy+tasE3zCvzG0JrM0mtAb3qc6fnb2v6+vZZMXUery+qLuyYCo5wLhdes1FSEFOCiNU3D5VjvKPu43alsRXqZC0QL2duJSrtLCgXn6+M772rvzktVzl3LbaXpZ0dpxyd9SugsGvh5NpnqShgErbudFymCmmVqcMbs1HWvSLyZEPqKz5nkyMmLa7z5eUtsapfZuBo462iHqntIuzsBCYrE2UpdOi5arjXb+O1ijZq+OZy7mLfLdfrGfLoYDPjtNZuzOr+bbL/Ze0uzbyhhAvvl768iwMghZbXW6wA7K7sWu9yKFcIii7g8nUutiohRq7aqWlp9BNmY+6ULzkwV6rN0Hc8UmRSMi6Is6x2qyOa4XKppWatHfQuEQ0mAe/U4ag/OuLoPd+eYOL8ni4ioQNXhGmmI+sFharn6LNvou/upPqXrDOfQqABKG5WtFxtM+KHNnpZ56RtPFhVU6Lwl97Ex4atIGYRE9nkJ+GHmV1SKh3i6yfOmRBXYOwpY2wp5cT8/L8Has9UUh6s9Tfet6Zv0uE/EXb1ZHqhuKUl+CQHZOHxqHFwShaU412bH+Jpn6mh9KODbqBHFq4Rpvsv7Mphc3unI2OkZ6ZUkGYxhLK7O9tV5PxuZ6GkJ2Wy/nYAFzX1N5ppGL6C6Xbj/A8yH3fXvYQJA6Iu828AxbM6gGkzcTqCaXRGNrLH98H+9uAv88a8th8SRnD3Y/C3cvD+HpV3dJrvlclkgsQEsGJ3q5d+QzWSq/aDPBezXrRDM8XzuTA1boAd6/S1xrtpEdRwr4L8P/LQ+ieBgzPXq2MecByH9v0Jcb7wdyGxP3WlLWrQk+8EArUxQIefB/Hz8oOit7LrsvSWgEI3vul2ybX2tyn6Ouu2tC8GyrcEbAJyNTK3r/oVszq7r4b3eoIdk/WDlwVXgvPovmob8jl1kmUxf/O+lksC8iCbvodyQdXxYzFz/rK6fTrwPNeGPnBqcn7pP4CCszfbqruz9P7sEzYy8osrFzv2M16Qo/F7AWnwNTOrH/q3sv5yY/Hy+cTyonAxRzqjcrN5LaUjhPslP/AetTN2shlrwD7ws28Uc5MQMi8+N/SzrTLxaL+bJ36yMQ4yI3E1tr57MCrRxbNsdrnwtgpvMvGPsW/6Y/U1hVd2ivX+s6vywKMDr3izvX+2bXSzvjqG9QF1cKRrGnJUvgJcHre1dnImv/XEh3sq4jC3E9c+NYN0/n0Ls9r/nDr1+uJ/YwBzBDXzjwJCVvDmPj+K8InJNrBzvPan+DOvgG0yScC3sCRyuDM3MGwxVmapJANgcC6f7Cq5e/KibjtXUPQvhsBaraNrNkTKdgLis1fyOv6+B9M68nuCy/vHOy6AUU65K/NoajbjrBP68sTzn7VFu4SWegLj+morsnKA1yEdM6D2qKWCAgPQs1+CMDGCgi6L4z7zowFL9tJ/63s4cPryBTBXNrSlsHcr7rFX83BxNhOPCsC6Yum3y4Mysk6IN0bPgWsgcj+xHzH4dPX7L35x8G+aD2VXBrJvE/fJdLNpssqaMvJjMFPyMWngq3Eact668WAG8g4e1kaib32gPvarJ2pAga6/F7JCJP47MT/U8HgvND8ycrOXO3b7Gm4zkfvXC2sai7lWdDo7STX2bwH1t8ZwpUv/MPe/Aux6YXZ+HwNqY3m1sCKpG/PfsJcTO6726QHy6jt1gl/rP2pE9A4VP/qkYpYxKHMyCE6+8bZ28Tky1Rc7gnMAgLpm/kZ0MFH/tGwzezD073GLf/N6cWk/AXhwsut3SRWCJpOHeVNw+uM0gTp8AK+Bd2y7r3OT8IeWd06CCQOaJ7XgQr6qaxuHVbJE/1m+/rVUsC0LSi+A9hYDSrK/+ysyM3o2N5vzcnee6XNyInOksCsEErHwYyd+UR56L3LrpffAiV808KG+856Hcc3+pgW6c3I6gcm7OggU8uwTZM+GHZWHHgHHA10/foZ6t2kKKvcBLfNxanAsusuqdoG/MRlyxpIEooIxE0X1k3Q3cTr6tBaXcDqpLoWFsTOvhSwC8DFkviwfq9XkC/Hq++GCuUnhAHY2lKsSQm8Caz7zSYgGM04/lkIyhCRyyiS/lqq+sfBvMmsHmz08/mIiyqYyLweG1GDHAG8ycwN1sG27cm2A/Df20rH6iW60g3Xwsn4DR3Ty9TI0+hP+8U0w+jSa/uVwMwaCr4iBs36S896C9PQwhmIC1i+GrXtie8PPA6Vzunl6uCayaz+TnAWUvbIFhVv6CUVz/moFcXf6NrKeUbQ6d1/2ET++BukXKjzwbSozximvA10G88p2vuu/QPL3nbOQMdfENV1yAb+svqqKenB0PAvwM6Xygiw4iNeGgKsINLOaLz+SODnssG8EeTLwoqmzegA0H4c6s4WH/zw3fTMwlB9/VLWzLBqTdMs69a6CsYFw6B6H8FcCY3LrO4sg9+oBFYruMW919HZwb4rzy+vFg2OWEReGfm6zM4MCHzqk+vYmq7c2gzE085s307Cyo4H6/r+lvm34sT69gp+1czcbHp+TUUH6o0lqhDc6kB0CQxbzJhUFOEO6aVYa/vDSMvc1Qjp0NwN1tuqg/6aJv7kyvh8xM8YSbHIDctV7B+6Hwt82fy+XMa+bopMzsnBPK21y+sc8guPz6V/0N+GBcdi+/9wXctYu8uuDwSb0a/LKStPE0AJYaeRDKISznjQ3kzNm5+luiCZWoyrzrnu11ysuJYs1LWHs5V6TgSq3EzLoZiCmqRxTA3nk5raCRdMDsbWw/35eb+XlrtEmoTrz+17koEWCmMAcP7MO9TdjQwWy7mDlvzH702KTixXFl2Ogv3Wvsp778gzwM4a/P3amqp+wcdioEnM/pfGxNvh3NnGsILJ/ap7ZbvYi5xLOMz8z8p36ikOmoGdh5OzU8jc5V/lipn+/su9U5ZG14keUVaeSypAugb5mcWu68/LDpd+XwoeV9Wcwcyshau5hnDKASyxvegGy0hBXO9C+4+cu4SN8dP8v7wA72jyWVpeiIWLDszDwM6fipLKudc2jONLQODOq8L+4J3+zQOa/F0vzjTBzPcFDdd+G8LOj8qT1/zIVt0mGuDI/t6P0dfhgsHz+IoRsIK3iYnOyAsskgGT1ojreguaKJq/muFepomEcNnZVouOpKZiIezP38pXKxnoK1lOB5lLqAW/1peL7d7krr6+khrWC7+WCc/o/8qkwPrIEvYEyXCARab3lShM2SECyMzC/cy6/9/gAFMboYzX9//Ogqr+R00uTsdO2hyf6uGirpBRDYa2SJX4VUThCcM8RGfsGy+9hOpf3i7I0Vf6C8/KxM2oVigSfbLL21+JDqzPr6LuEYHc9ZBBloGFgd7EnczS3erf1IzZ2/BS3NUMwDardkysSudRgMTaHO7a/9+TsrSOkx9d799bWYr/3lajWinGqHaVmYiIFNfNB7tH28UMz8fBLwPpjtgEyWhe0okI3K2tGAzs4Qsuz5iNHCtGrrna4erMAIqP2g3X2C3HuPyYHrLeDbVMyQ3W/MIv3fIW3WGwFJr584NbyImm4R1ewqv83C1wOqCFBvfzk4iCiZw2SQ8QBL5cLe1iQ7/aIXve2atU2iWkg8EOkqydWa6qLnzcwcDOCnY6y8SXmcYb4NqrrPgVjLvBzpZDbo5SRJC1iZjCFO/Z/7jSCxfH/xvU7zgArDjP+0z3WEmQhoyIwizvO8ae6u/7ZY+Fbl0SayHZhL36LNaUmoREfJUkUGC7rQ4EwJPMWpYBj4uFkIrK6AFL+dWm3//BhYH5d0+3gL+O2sn46f+o+/3NAJ6A7q/Wrd0aLNnZoQWZo15wSyuVjLWMj/uCZJYNAdcrPNw+GdXsqVaw2rzoXK7D3WXZ/O1EfHiNJaZavky2mpy5utT9EKy+F9cMlRx7jHvC7R7LzLzQ7MaWXquNu6+kQCWuzZmYhdqPTRqrXeos/MPN/3ibmI5RwgzOydz+wtTWuHJPjS81z5uvMZeZ7fnT60TC/6YX69WarHVoQ8n+yRJVjNvVzJWsqquTjZzD1QESDGwa/I8WDP6W1azp70yfn9L8jtiPs8jBHg56vCvFi+P4XoIA5QPSlavPmEuX3/7CnsuE1ri9CLHP+S8v2JP/itLUjtLLtcrHwZVJz7OLrsdAmF3+Hfl+5D+34UjC6tXFJMft/Rmt70HnvBDAwcWTl7+bPUJMj9VZyXkK+CfAFMH7q+nJX9v5/j7JHpRIEZwUv4KZQwzf/azqKK4yrvjLWtZAz/gU/BIBBLeGArudn5ytnhVXiaIRflqLqYSVmWsa1slb3Z37/NXKusIRCVQDBQwNAysKDxUL9hnJzpYJTAD5x8JdrYPeQova3NW8+Y4Cp823uFXY35yYrYXDc7oBXMr6vduLIY5JxutR/hlF1Aqc68zlKQOCUs1Hk71KKgUuzZAPQcaHg9j+qxPFr4LcwVSboVG+vDDKt4frsIKolmukn3pYjxrY0vzpWBWa+88VIhyanlnH2qmJ0ZyA1LSRQoYCraqMW6F5AaIBT0Bb28BZPMGBEdSn+sEtXqxLjJ688rhhR7iJGgHtEsq4H/vVB5yGqI4MKr8ahcWBDV+Q+bhWjwKsb4zL2A/NSf3Fxs5dyuD81gH4keysnnihX3hBw9a1azs6kZ6qH2yEhrGIg3PXgaTbrL4a/Qz+CVzBnwl+9RTVzsLsq50ryCnTetYBVx5GPH2o2paXG978xUv7jSxv3OdFqLKbUk3HPoePDre8LQ3Kzb66Dt7PrZnLsab550nI3+vs2pv1APqBykvPq14nnYX8+lOJUh5KAQUcLfDCBNyJqduZg13dLauPtVrY+pgNvQuQiZL6C86Wqn2My/1Vj7WF+Y7tXHieyJOuAfrBb9KfcNbRUerG+O/JA8TS2eSXzN1D3KoaewaOs/mDkLqNF5e81u9U2lW8wtSo1gNcB5Olf8evzvvy08QL7R/Cut8CBL0EAFDF/tZXksEKFgz4w8E96mDNCBqRELDYbpppj7VKimm/S4ajBtfv/UPljdzJi+4pVMnLpEW31crNzLhZ+ZlPnb3FkEvLLsNMUS9WydsI+jrun9bOj8INr0Ccu5GDYkOY+klc1tq/6+Tv25DDKQ76qqwly8n/rrqRXRkPjsaWyv0L1+mtwIpOzITcQcnfGAy8bMHu0Khv+phZP3OH9ahbyR7O1/SHCaPpwP75yH7X3tUt/+oExT15rw8OyQSU1NnGz9TKgrXBG9LWnysq+tDGzgyax0cCy53bzU+BmJq+q52NyN+c1s/c3uq4nP/O7FZIe/9PQxWFKM8CVAbjwlReBJfXzfrG6VKOqhfD3qz3As6Fat9cAcUthGitkRGQmV2fiUOClL68llCSv7EYx4Eb3fbKDOmt35YG36scwuio6h2U/fG73koXdFDI/AnE/dr1745A/YZubSzMBt4L/y2Iu7CqkruOj2mV/gvszNze9mCg55ivzAFdzcdCrPwA/A2bvhIHr0/RzN6txefOVc6K980OGMXNHN6p3CvlRZCyR5Z4nv1Kmq2DaQ+ZUxHNAdIWP47+we+RB0TEqMCfpo5ZQEW4bwkF3OvdQMzhB8EOu/8NmMmKATLXyT4dmFf5D/xG/dYTy+t0SvDb30PW3X3p75roqP/qV+bt5cnSh4EYX8XrCErTzg3skZgHrs7fLZSrrHjM7ZDISckZgTSSpP13HZGUYLxYiNCxyv0dvEmKDsas6q3OippEWtBkDLZY7apK+5morY6raV9SxeHVUsvMwFxdNo7O/8yq"
    }
    axios({
      url: captchaApiUrl,
      method: 'post',
      headers: headers,
      timeout: 15000,
      json: JSON.stringify(paraJson)
    }).then(res => {
      console.log('-------------------------3:获取captchaToken----------------------')
      console.log(res)
    }).catch(err => {
      console.log('-------------------------错误----------------------')
      console.log(err)
    })