FROM node:16-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_AUTH0_DOMAIN
ARG NEXT_PUBLIC_AUTH0_CLIENT_ID
ARG NEXT_PUBLIC_BACKEND
ARG NEXT_PUBLIC_IDENTIFIRE

ARG NEXT_PUBLIC_REGION
ARG NEXT_PUBLIC_BUCKET_NAME
ARG NEXT_PUBLIC_ACCESS_KEY
ARG NEXT_PUBLIC_SECRET_KEY
ARG NEXT_PUBLIC_S3_URL

ENV NEXT_PUBLIC_BASE_URL $NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_AUTH0_DOMAIN $NEXT_PUBLIC_AUTH0_DOMAIN
ENV NEXT_PUBLIC_AUTH0_CLIENT_ID $NEXT_PUBLIC_AUTH0_CLIENT_ID
ENV NEXT_PUBLIC_BACKEND $NEXT_PUBLIC_BACKEND
ENV NEXT_PUBLIC_IDENTIFIRE $NEXT_PUBLIC_IDENTIFIRE

ENV NEXT_PUBLIC_REGION $NEXT_PUBLIC_REGION
ENV NEXT_PUBLIC_BUCKET_NAME $NEXT_PUBLIC_BUCKET_NAME
ENV NEXT_PUBLIC_ACCESS_KEY $NEXT_PUBLIC_ACCESS_KEY
ENV NEXT_PUBLIC_SECRET_KEY $NEXT_PUBLIC_SECRET_KEY
ENV NEXT_PUBLIC_S3_URL $NEXT_PUBLIC_S3_URL

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
