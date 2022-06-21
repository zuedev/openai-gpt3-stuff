import "dotenv/config";

fetch("https://api.openai.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "text-davinci-002",
    prompt: process.argv[2],
    max_tokens: 4000,
  }),
}).then((response) =>
  response.json().then((data) => console.log(data.choices[0].text))
);
