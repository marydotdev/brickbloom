/**
 * These seeds are ids pointing to a collection of predictions run on Zoo.
 *
 * To add a new seed, you need to generate predictions on Zoo and then
 * save the id url parameter of the submission.
 *
 * Here's how:
 * 1. Run Zoo locally with `npm run dev`
 * 2. Run ngrok with `ngrok http 3000`. Set your NGROK_HOST environment variable to the url ngrok gives you.
 * This is required because it serves as the endpoint for the webhook that saves predictions to the database.
 * 3. Create a submission (enter a prompt and press go)
 * 4. Save the id URL param and add it to the list here!
 */

const seeds = [
  "3ed0a1aa-95c4-40fa-ae7d-8dc42ca99765",
  "a7d43d6a-f891-403c-b89a-a48c44e35802",
  "5ff07bac-9944-411a-907f-ece852e2cec8",
  "9a3e0f4c-e01f-488e-90bc-218db60f66e7",
  "a9a7cb97-04d5-4ec3-a3ea-21d178092acb",
  "08fe73b4-2ab4-46b1-8a91-a4392b54997e",
  "a1920791-41e2-45f4-8cca-bcfc01440fd4",
  "831bbaa3-3071-43ad-aaa4-4765ffb95cd1",
  "53d5acf3-7092-46a9-8219-f788b986c196",
];

module.exports = seeds;
