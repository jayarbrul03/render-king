module.exports = {
  apps: [
    {
      name: "render-king",
      cwd: "/var/www/render-king",
      script: "dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "512M",
      error_file: "/var/log/render-king/error.log",
      out_file: "/var/log/render-king/out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
