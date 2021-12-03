

const production = {
    env: 'production',
    apiBaseUrl: '', // relative path
}

const development = {
    env: 'development',
    apiBaseUrl: 'http://localhost:5000',
}

export default process.env.NODE_ENV === 'production' ? production : development