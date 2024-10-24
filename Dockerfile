FROM base-registry.zhonganinfo.com/env/node:16.20.0 

# Setup app directory and environment variable
WORKDIR /root/app
ENV NPM_CONFIG_REGISTRY https://npm.zhonganinfo.com

# Install app dependencies
COPY package.json /root/app/
RUN npm install --no-optional --legacy-peer-deps

# Bundle app source
COPY . /root/app

# Build app source
RUN npm run build
RUN chmod 655 /root

EXPOSE 8080
CMD ["sh", "start.sh"]
