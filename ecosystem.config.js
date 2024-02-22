module.exports = {
  apps: [
    {
      name: 'unetaupechezvous.fr',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
