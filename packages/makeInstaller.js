const makeInstaller = (components = []) => {
  const apps = []

  const install = (app) => {
    if (apps.includes(app)) return
    apps.push(app)

    components.forEach((c) => {
      app.use(c)
    })
  }

  return {
    install,
  }
}

export default makeInstaller
