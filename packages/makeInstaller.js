const makeInstaller = (components = []) => {
  const apps = []

  const install = (app, opts) => {
    const defaultInstallOpt = {
      size: '',
      zIndex: 2000,
    }

    const option = Object.assign(defaultInstallOpt, opts)
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
