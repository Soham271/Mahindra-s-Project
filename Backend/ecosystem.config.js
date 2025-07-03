module.exports = {
  apps: [
    {
      name: "myapp",
      script: "./app.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: 3004,
        CORS_ORIGINS: "http://localhost:5173",
      },
    },
  ],
};
