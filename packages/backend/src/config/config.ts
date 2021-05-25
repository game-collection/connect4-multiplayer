
const production = process.env.NODE_ENV === "production";

export const config = {
  client: {
    domain: production ? "https://connect4-frontend.herokuapp.com" : "http://localhost:3000",
  },
  server: {
    port: process.env.PORT ? Number.parseInt(process.env.PORT) : 5000,
    domain: production ? "https://connect4-server.herokuapp.com" : "http://localhost:5000",
  },
};