const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/components/'),
            '@config': path.resolve(__dirname, 'src/config/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@store': path.resolve(__dirname, 'src/store/'),
        },
    },
};
