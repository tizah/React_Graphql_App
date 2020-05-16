export function handler(event, context, callback) {
  callback({
    statusCode: 200,
    body: JSON.stringify(event),
  });
}
