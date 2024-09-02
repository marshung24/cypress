# 使用 Dev Container 開發

## 安裝容器開發插件
- `Visual Studio Code`安裝插件`Dev Containers`
- 按左下角 or 快速鍵：
  - 在容器中重新開啟： `control` + `command` + `c`
  - 在區域重新開啟資料夾： `control` + `command` + `l`

## 安裝`X11`
### Macbook環境
- 安裝套件：`XQuartz` https://www.xquartz.org/
- 安全性設定：打開`設定`到頁籤`安全性`後，勾選`允許從網路用戶端連線`。
- 允許來源：打開`xterm`設定`xhost +localhost`

## Windows環境
- 安裝套件：`VcXsrv` https://sourceforge.net/projects/vcxsrv/
- 設定`VcXsrv`

## 執行Cypress
- 安裝套件
```bash
npm ci
```
- 執行Cypress GUI模式
```bash
npx cypress open
```



### Debug
- 問題：`Macbook`未開啟`X11`

    Cypress failed to start.

    This may be due to a missing library or dependency. https://on.cypress.io/required-dependencies

    Please refer to the error below for more details.

    ----------

    [1026:0902/164354.154635:ERROR:bus.cc(407)] Failed to connect to the bus: Failed to connect to socket /run/dbus/system_bus_socket: No such file or directory
    Authorization required, but no authorization protocol specified
    [1026:0902/164354.985157:ERROR:ozone_platform_x11.cc(240)] Missing X server or $DISPLAY
    [1026:0902/164354.985176:ERROR:env.cc(255)] The platform failed to initialize.  Exiting.

    ----------

    Platform: linux-arm64 (Debian - 11.9)
    Cypress Version: 13.7.0

  - 解決：
    - 安裝`XQuartz`
    - 打開`設定`到頁籤`安全性`後，勾選`允許從網路用戶端連線`。
    - 打開`xterm`設定`xhost +localhost`




