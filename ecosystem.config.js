module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: '/var/www/Sarthi/frontend',
      script: '/var/www/Sarthi/frontend/run-frontend.sh',
      env: {
        NODE_ENV: 'production'
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    },
    {
      name: 'backend',
      cwd: '/var/www/Sarthi/backend',
      script: '/var/www/Sarthi/backend/run-backend.sh',
      env: {
        NODE_ENV: 'production'
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    }
  ]
};
