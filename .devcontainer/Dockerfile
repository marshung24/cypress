# 指定基礎鏡像
FROM node:18.16.0-alpine3.17

# 執行安裝的目錄
WORKDIR /usr/blog

# 安裝 bash git openssh 以及 c 的編譯工具
RUN apk add bash git openssh vim xvfb-run


# apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb

# 設置容器時區為台北，不然發布文章的時間是國際時間，也就是比我們晚 8 個小時
RUN apk add --no-cache tzdata
ENV TZ=Asia/Taipei

# 安裝 Cypress
# RUN \ 
# npm install cypress --save-dev

# 設置通訊連接埠
# EXPOSE 4000
