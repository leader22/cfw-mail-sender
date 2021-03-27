import { index, result } from "./src/view.js";
import { parseFormData, sendMail } from "./src/domain.js";

addEventListener("fetch", event => {
  const { method, headers } = event.request;

  // return form html
  if (method === "GET") {
    return event.respondWith(handleGet(event));
  }

  // parse form body and send mail
  if (
    method === "POST" &&
    headers.get("content-type") === "application/x-www-form-urlencoded"
  ) {
    return event.respondWith(handlePost(event));
  }

  return event.respondWith(new Response("404: Not found"));
});

async function handleGet() {
  return new Response(index(), {
    headers: { "content-type": "text/html" }
  });
}

async function handlePost(event) {
  const params = await parseFormData(event.request);
  event.waitUntil(sendMail(params));
  // await sendMail(params)

  return new Response(result(), {
    headers: { "content-type": "text/html" }
  });
}
