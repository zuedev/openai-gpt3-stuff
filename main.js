import "dotenv/config";

switch (process.argv[2]) {
  case "complete":
    complete(process.argv[3]).then(parseResponse);
    break;
  case "edit":
    edit(process.argv[3], process.argv[4]).then(parseResponse);
    break;
  default:
    throw new Error("Unknown command.");
}

const config = {
  fetchHeaders: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

function complete(prompt) {
  return fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: config.fetchHeaders,
    body: JSON.stringify({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 4000,
    }),
  });
}

function edit(input, instruction) {
  return fetch("https://api.openai.com/v1/edits", {
    method: "POST",
    headers: config.fetchHeaders,
    body: JSON.stringify({
      model: "text-davinci-edit-001",
      input: input,
      instruction: instruction,
    }),
  });
}

function parseResponse(response) {
  return response.json().then((data) => console.log(data.choices[0].text));
}
