import {AppController} from "../controllers/app-controller";

const GET = (req, res) => {
  return AppController.index(req, res)
}

GET.apiDoc = {
  summary: "root path",
  operationId: "index",
  responses: {
    200: {
      description: "Root API response."
    },
  }
}

export default () => {
  return {GET}
}
