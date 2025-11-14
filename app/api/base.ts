import { restClient } from "@massive.com/client-js";

const rest = restClient(import.meta.env.VITE_MASSIVE_API_KEY);

export default rest;
