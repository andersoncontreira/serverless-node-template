
const GET = (req, res) => {
  res.json({'app': 'OK'})
}

GET.apiDoc = {
  summary: "alive path",
  operationId: "alive",
  responses: {
    200: {
      description: "Health status."
    },
  }
};

export default () => {
  return {GET}
}
