import "dotenv/config";

const config = {
  fetchHeaders: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
};

switch (process.argv[2]) {
  case "complete":
    complete(process.argv[3]).then(parseResponse);
    break;
  case "edit":
    edit(process.argv[3], process.argv[4]).then(parseResponse);
    break;
  case "emojify":
    emojify(process.argv[3]).then(parseResponse);
    break;
  case "l33t":
    l33t(process.argv[3]).then(parseResponse);
    break;
  case "youtube_thumbnail":
    youtube_thumbnail(process.argv[3]).then(parseResponse);
    break;
  case "get_random_live_twitch_stream":
    get_random_live_twitch_stream().then(parseResponse);
    break;
  default:
    throw new Error("Unknown command.");
}

function complete(prompt, options) {
  return fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: config.fetchHeaders,
    body: JSON.stringify({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 4000,
      ...options,
    }),
  });
}

function edit(input, instruction, options) {
  return fetch("https://api.openai.com/v1/edits", {
    method: "POST",
    headers: config.fetchHeaders,
    body: JSON.stringify({
      model: "text-davinci-edit-001",
      input: input,
      instruction: instruction,
      ...options,
    }),
  });
}

function parseResponse(response) {
  return response.json().then((data) => console.log(data.choices[0].text));
}

function emojify(text) {
  let prompt = "Convert text into Emoji.\n";
  prompt += `${text}: `;

  return complete(prompt, {
    temperature: 0,
  });
}

function l33t(text) {
  let prompt = "Convert text into L33T Speak.\n";
  prompt += `${text}: `;

  return complete(prompt, {
    temperature: 0,
  });
}

function youtube_thumbnail(url) {
  let prompt = `Get YouTube thumbnail: ${url}`;

  return complete(prompt, {
    temperature: 0,
  });
}

function get_random_live_twitch_stream() {
  return complete("Random live Twitch stream:", {
    temperature: 0,
  });
}
