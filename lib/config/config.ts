interface Config {
    URL: string
}

const config: Config = {
    URL: process.env.URL || "16.145.81.136" || "localhost", // temp solution
}

export default config