import { app, Menu } from 'electron'


const AppMenu = () => {
    const isMac = process.platform === 'darwin'
    
    const template = [
      // { role: 'appMenu' }
      ...(isMac ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }] : [])];
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    return null;
}

export default AppMenu;