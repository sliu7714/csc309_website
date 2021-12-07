const production = {
    env: 'production',
    apiBaseUrl: '', // relative path
}

const development = {
    env: 'development',
    apiBaseUrl: 'http://localhost:5000',
    useFrontendTestUser: true, // set this true if want to use frontend user, must be running server with test user as well
    frontendTestUserIsAdmin: false,
}

export default process.env.NODE_ENV === 'production' ? production : development

