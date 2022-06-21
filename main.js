import "dotenv/config";

switch (process.argv[2]) {
  case "complete":
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-002",
        prompt: process.argv[3],
        max_tokens: 4000,
      }),
    }).then((response) =>
      response.json().then((data) => console.log(data.choices[0].text))
    );
    break;
  case "edit":
    fetch("https://api.openai.com/v1/edits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-edit-001",
        input: process.argv[3],
        instruction: process.argv[4],
      }),
    }).then((response) =>
      response.json().then((data) => console.log(data.choices[0].text))
    );
    break;
  default:
    throw new Error("Unknown command.");
}
