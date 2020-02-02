const message = 'Some message from myModules.js'

const name = 'LSM'

const location = 'Heoung Deok'

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export {message,name,getGreeting,location as default}