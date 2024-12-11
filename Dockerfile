ARG NODE_VERSION=22.12

FROM node:${NODE_VERSION}-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Copy the source code
COPY . .

# Buid
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build

# Use the Nginx image to serve the Angular app
FROM nginx:1.27.3-alpine

COPY nginx.conf /etc/nginx/nginx.conf
# Copy the built Angular app from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/static/uploads

# Expose port 80
EXPOSE 80
