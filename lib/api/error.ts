type TAPIErrorConstructor = {
  message?: string
} & typeof defaultConstructorConfig

const defaultConstructorConfig = {
  statusCode: 500,
  statusMessage: "Interval Server Error",
}

export class APIError extends Error {
  statusCode: number
  statusMessage: string
  name = "APIError"
  constructor(options: TAPIErrorConstructor = defaultConstructorConfig) {
    super(options?.message || options?.statusMessage)

    this.statusMessage = options.statusMessage
    this.statusCode = options.statusCode
    this.message = options?.message || options.statusMessage

    Object.setPrototypeOf(this, APIError.prototype)
  }
}

export class DataFetchError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DataFetchError"
  }
}
