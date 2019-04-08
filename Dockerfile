# 指定基础image
FROM docker.robert.com/robert-dev/robert-node:8.9-alpine
# 指定作者（author）
MAINTAINER robert (robert.q.chen@gmail.com)

# 正文开始
# step 1: 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件目录下
ADD . /app/

# step 2: 进入/app目录
WORKDIR /app

# step 3: 安装项目依赖包
RUN npm install --registry=https://registry.npm.taobao.org

RUN npm install node-sass

# step 4: 配置环境变量
ENV HOST 0.0.0.0
ENV PORT 8090

# step 5: 容器对暴露的端口号
#EXPOSE 8000

# step 6: 容器启动时执行的命令
CMD ["npm","run","dev"]
