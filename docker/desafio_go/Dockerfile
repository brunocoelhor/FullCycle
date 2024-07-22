FROM golang:1.23rc2-alpine3.20 AS builder

WORKDIR /src

COPY main.go .

RUN go build -ldflags="-s -w" main.go

FROM scratch

COPY --from=builder /src/main .

CMD ["./main"]

