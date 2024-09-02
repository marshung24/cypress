# 指定基礎鏡像 - 需跟package.json中Cypress版本一致，否則需自行安裝
FROM cypress/included:cypress-13.7.0-node-20.11.0-chrome-121.0.6167.184-1-ff-123.0-edge-121.0.2277.128-1

# 執行安裝的目錄
WORKDIR /srv/cypress

# 安裝 bash git openssh 以及 c 的編譯工具
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash git openssh-client vim net-tools xvfb tzdata dbus-x11 iputils-ping \
    && rm -rf /var/lib/apt/lists/*

# 安裝Browser Chromium, Firefox - ARM平台需自己裝，x86可註解掉。
RUN apt-get update && apt-get install -y --no-install-recommends chromium firefox-esr

# 設置容器時區為台北，不然發布文章的時間是國際時間，也就是比我們晚 8 個小時
ENV TZ=Asia/Taipei

# 遠端X11試調
# Macbook 中要在 XQuartx中xterm設定開放允許連線來源：開放localhost： `xhost +localhost` ； 開放全部：`xhost +`
ENV HOST_IP host.docker.internal
ENV DISPLAY ${HOST_IP}:0

# Filesystem Monitoring Lib Chokidar
ENV CHOKIDAR_USEPOLLING=true