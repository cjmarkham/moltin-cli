import { ResponseError } from "../schemas";

const newResponseError = (status: number, title: string, detail: string): ResponseError => {
  return {
    status,
    title,
    detail,
  }
}

export {
  newResponseError,
}
