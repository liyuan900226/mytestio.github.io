FROM node:10
COPY ./ /app
WORKDIR /app
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

# 也可以在本地编译打包后生成
# FROM nginx
# COPY ./dist /app
# WORKDIR /app
# COPY nginx.conf /etc/nginx/nginx.conf



######################################

# 构建 docker build . -t my-app
# 运行 docker run -d -p 8080:80 my-app
