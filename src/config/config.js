const config = Object.freeze({
    SERVER_URL: import.meta.env.VITE_BASE_URL,
})

const getEnv = (key) => {
    const value = config[key];
    if(!value) throw new Error(`Config ${key} not found`);
    return value;
}

export default getEnv;